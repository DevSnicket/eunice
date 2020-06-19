module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.RegisterAndGetPathOfMsbuild

type MSBuildLocator = Microsoft.Build.Locator.MSBuildLocator

let registerAndGetPathOfMsbuild =
    MSBuildLocator.RegisterDefaults ()
    |> ignore

    MSBuildLocator.QueryVisualStudioInstances()
    |> Seq.head
    |> (fun visualStudioInstance -> visualStudioInstance.MSBuildPath)