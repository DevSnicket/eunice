module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.FindParametersForTestCasesInDirectoryPath

open System.IO

let findParametersForTestCasesInDirectoryPath directoryPath =
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
                |> findParametersForTestCasesInDirectoryPath
        ]

    and parametersWhenFileExists () =
        seq [
            "csproj"
            "sln" // cSpell:ignore sln
        ]
        |> Seq.tryPick parametersWhenFileWithExtensionExists

    and parametersWhenFileWithExtensionExists extension =
        let projectFilePath =
            [| subdirectoryPath; "TestCase." + extension |]
            |> Path.Join

        match projectFilePath |> File.Exists with
        | true -> Some [| projectFilePath |]
        | false -> None

    getForSubdirectoryPath ()