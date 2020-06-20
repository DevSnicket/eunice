module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath

open DevSnicket.Eunice.AnalyzeProject

type List<'T> = System.Collections.Generic.List<'T>
type String = System.String
type Path = System.IO.Path

let analyzeProjectOrSolutionPath (projectOrSolutionPath: String) =
    match projectOrSolutionPath |> Path.GetExtension with
    | ".sln" -> // cSpell:ignore sln
        projectOrSolutionPath |> analyzeSolutionPath
    | _ ->
        projectOrSolutionPath |> analyzeProjectPath

let private analyzeSolutionPath solutionPath =
    async {
        use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

        let addFailuresToErrors = workspace |> addFailuresToErrorsFromWorkspaceEvent

        let! solution =
            solutionPath
            |> workspace.OpenSolutionAsync
            |> Async.AwaitTask

        let! errorsAndYamlOfProjects =
            solution.Projects
            |> analyzeFirstOfEachAssemblyInSupportedProjects
            |> Async.Parallel

        return
            {
                Errors =
                    errorsAndYamlOfProjects
                    |> Seq.collect (fun errorsAndYaml -> errorsAndYaml.Errors)
                Yaml =
                    errorsAndYamlOfProjects
                    |> Seq.collect (fun errorsAndYaml -> errorsAndYaml.Yaml)
            }
            |> addFailuresToErrors
    }

let private analyzeFirstOfEachAssemblyInSupportedProjects projects =
    projects
    |> Seq.groupBy (fun project -> project.AssemblyName)
    |> Seq.collect (fun (_, projects) -> projects |> analyzeFirstSupportedProject)

let private analyzeFirstSupportedProject projects =
    projects
    |> Seq.tryFind isProjectSupported
    |> Option.map (fun supportedProject -> seq [ supportedProject |> analyzeProject ])
    |> Option.defaultWith (fun () -> projects |> Seq.map getErrorsAndYamlForProjectNotSupported)

let private analyzeProjectPath projectPath =
    async {
        use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

        let addFailuresToErrors = workspace |> addFailuresToErrorsFromWorkspaceEvent

        let! project =
            projectPath
            |> workspace.OpenProjectAsync
            |> Async.AwaitTask

        let! result =
            match project |> isProjectSupported with
            | true ->
                project |> analyzeProject
            | false ->
                project |> getErrorsAndYamlForProjectNotSupported

        return result |> addFailuresToErrors
    }

let private addFailuresToErrorsFromWorkspaceEvent workspace =
    let workspaceFailures = List<String>()

    let rec addEventHandler () =
        addWorkspaceFailureFromEvent |> workspace.WorkspaceFailed.Add

    and addWorkspaceFailureFromEvent event =
        event.Diagnostic.Message
        |> workspaceFailures.Add

    let addFailuresToErrors result =
        {
            Errors =
                seq [
                    yield! workspaceFailures
                    yield! result.Errors
                ]
            Yaml =
                result.Yaml
        }

    addEventHandler ()

    addFailuresToErrors

let private getErrorsAndYamlForProjectNotSupported project =
    async.Return
        {
            Errors = seq [ "Project " + project.Name + " loaded with no metadata references." ]
            Yaml = seq []
        }

let private isProjectSupported project =
    project.MetadataReferences.Count > 0