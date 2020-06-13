module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath

open DevSnicket.Eunice.AnalyzeProject
open System
open System.IO

let analyzeProjectOrSolutionPath (projectOrSolutionPath: String) =
     match projectOrSolutionPath |> Path.GetExtension with
     | ".sln" -> // cSpell:ignore sln
          projectOrSolutionPath |> analyzeSolutionPath
     | _ ->
          projectOrSolutionPath |> analyzeProjectPath

let private analyzeSolutionPath solutionPath =
     async {
          use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

          let! solution =
               solutionPath
               |> workspace.OpenSolutionAsync
               |> Async.AwaitTask
          
          let! yaml =
               solution.Projects
               |> Seq.map analyzeProject
               |> Async.Parallel
          
          return yaml |> Seq.concat
     }

let private analyzeProjectPath projectPath =
     async {
          use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

          let! project =
               projectPath
               |> workspace.OpenProjectAsync
               |> Async.AwaitTask

          return! project |> analyzeProject
     }