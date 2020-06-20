module rec DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.AnalyzeSolutionPath

open DevSnicket.Eunice
open DevSnicket.Eunice.AnalyzeProject
open DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.AddFailuresToErrorsFromWorkspaceEvent
open DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.GetErrorsAndYamlForProjectNotSupported
open DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.IsProjectSupported

type Project = Microsoft.CodeAnalysis.Project

let analyzeSolutionPath solutionPath =
    async {
        use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

        let addFailuresToErrors = workspace |> addFailuresToErrorsFromWorkspaceEvent

        let! solution =
            solutionPath
            |> workspace.OpenSolutionAsync
            |> Async.AwaitTask

        let! errorsAndYamlOfProjects =
            solution.Projects
            |> Seq.sortBy (solution |> getProjectDependencyIndexInSolution)
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

let private getProjectDependencyIndexInSolution solution =
    let orderedProjectIdentifiers =
        solution.GetProjectDependencyGraph().GetTopologicallySortedProjects()
        |> Seq.toList

    let getProjectDependencyIndex (project: Project) =
        orderedProjectIdentifiers
        |> List.findIndex (fun projectIdentifier -> projectIdentifier = project.Id)

    getProjectDependencyIndex

let private analyzeFirstOfEachAssemblyInSupportedProjects projects =
    projects
    |> Seq.groupBy (fun project -> project.AssemblyName)
    |> Seq.collect (fun (_, projects) -> projects |> analyzeFirstSupportedProject)

let private analyzeFirstSupportedProject projects =
    projects
    |> Seq.tryFind isProjectSupported
    |> Option.map (fun supportedProject -> seq [ supportedProject |> analyzeProject ])
    |> Option.defaultWith (fun () -> projects |> Seq.map getErrorsAndYamlForProjectNotSupported)