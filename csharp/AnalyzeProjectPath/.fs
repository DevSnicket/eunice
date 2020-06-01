module DevSnicket.Eunice.AnalyzeProjectPath

open System

let analyzeProjectPath projectPath =
     async {
          Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
          |> ignore

          use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

          let! project =
               projectPath
               |> workspace.OpenProjectAsync
               |> Async.AwaitTask

          let! compilation =
               project.GetCompilationAsync ()
               |> Async.AwaitTask

          return
               compilation.Assembly.TypeNames
               |> Seq.map (fun typeName -> "- " + typeName)
     }