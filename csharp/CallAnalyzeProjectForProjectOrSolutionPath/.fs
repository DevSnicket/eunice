module rec DevSnicket.Eunice.CallAnalyzeProjectForProjectOrSolutionPath

open DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.AddFailuresToErrorsFromWorkspaceEvent
open DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.FormatNotSupportedErrorForProject
open DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.GetErrorsAndProjectsFromSolution
open DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.IsProjectSupported

type MSBuildWorkspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace
type String = System.String
type Path = System.IO.Path

let callAnalyzeProjectForProjectOrSolutionPath projectOrSolutionPath analyzeProject =
    async {
        use workspace = MSBuildWorkspace.Create ()

        let addFailuresToErrors = workspace |> addFailuresToErrorsFromWorkspaceEvent

        let! errorsAndProjects =
            projectOrSolutionPath |> getErrorsAndProjectsFromProjectOrSolutionPathInWorkspace workspace

        let! errorsAndYaml =
            errorsAndProjects
            |> Seq.map (
                function
                | Error error ->
                    async.Return {
                        Errors = seq [ error ]
                        Yaml = seq []
                    }
                | Project project ->
                    project |> analyzeProject
            )
            |> Async.Parallel

        return
            {
                Errors =
                    errorsAndYaml
                    |> Seq.collect (fun errorsAndYaml -> errorsAndYaml.Errors)
                Yaml =
                    errorsAndYaml
                    |> Seq.collect (fun errorsAndYaml -> errorsAndYaml.Yaml)
            }
            |> addFailuresToErrors
    }

let private getErrorsAndProjectsFromProjectOrSolutionPathInWorkspace workspace =
    let rec fromProjectOrSolutionPath (projectOrSolutionPath: String) =
        match projectOrSolutionPath |> Path.GetExtension with
        | ".sln" ->
            projectOrSolutionPath |> fromSolutionPath
        | _ ->
            projectOrSolutionPath |> fromProjectPath

    and fromSolutionPath solutionPath =
        async {
            let! solution =
                solutionPath
                |> workspace.OpenSolutionAsync
                |> Async.AwaitTask

            return solution |> getErrorsAndProjectsFromSolution
        }

    and fromProjectPath projectPath =
        async {
            let! project =
                projectPath
                |> workspace.OpenProjectAsync
                |> Async.AwaitTask

            return
                seq [
                    match project |> isProjectSupported with
                    | true ->
                        ErrorOrProject.Project project
                    | false ->
                        Error (project |> formatNotSupportedErrorForProject)
                ]
        }

    fromProjectOrSolutionPath