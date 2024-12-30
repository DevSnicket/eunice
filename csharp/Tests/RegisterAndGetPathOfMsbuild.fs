// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.RegisterAndGetPathOfMsbuild

type MSBuildLocator = Microsoft.Build.Locator.MSBuildLocator

let registerAndGetPathOfMsbuild =
    if MSBuildLocator.CanRegister then
        MSBuildLocator.RegisterDefaults ()
        |> ignore

    MSBuildLocator.QueryVisualStudioInstances()
    |> Seq.head
    |> (fun visualStudioInstance -> visualStudioInstance.MSBuildPath)