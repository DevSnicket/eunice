module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath

open DevSnicket.Eunice.AnalyzeProject
open DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.AddFailuresToErrorsFromWorkspaceEvent
open DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.AnalyzeSolutionPath
open DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.GetErrorsAndYamlForProjectNotSupported
open DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.IsProjectSupported

type MSBuildWorkspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace
type String = System.String
type Path = System.IO.Path

let analyzeProjectOrSolutionPath (projectOrSolutionPath: String) =
    match projectOrSolutionPath |> Path.GetExtension with
    | ".sln" -> // cSpell:ignore sln
        projectOrSolutionPath |> analyzeSolutionPath
    | _ ->
        projectOrSolutionPath |> analyzeProjectPath

let private analyzeProjectPath projectPath =
    async {
        use workspace = MSBuildWorkspace.Create ()

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