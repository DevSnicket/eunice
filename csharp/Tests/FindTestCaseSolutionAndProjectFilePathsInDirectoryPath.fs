// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.FindTestCaseSolutionAndProjectFilePathsInDirectoryPath

open System.IO

let findTestCaseSolutionAndProjectFilePathsInDirectoryPath directoryPath =
    directoryPath
    |> Directory.EnumerateDirectories
    |> Seq.collect findParametersInSubdirectoryPath

let private findParametersInSubdirectoryPath subdirectoryPath =
    let rec getForSubdirectoryPath () =
        seq [
            yield!
                parametersWhenFileExists ()
                |> Option.toList
            yield!
                subdirectoryPath
                |> findTestCaseSolutionAndProjectFilePathsInDirectoryPath
        ]

    and parametersWhenFileExists () =
        seq [
            "csproj"
            "sln"
        ]
        |> Seq.tryPick parametersWhenFileWithExtensionExists

    and parametersWhenFileWithExtensionExists extension =
        let projectFilePath =
            [| subdirectoryPath; "TestCase." + extension |]
            |> Path.Join

        match projectFilePath |> File.Exists with
        | true -> Some projectFilePath
        | false -> None

    getForSubdirectoryPath ()