module rec DevSnicket.Eunice.AnalyzeProjectPath._Tests.FindParametersForTestCasesInDirectoryPath

open System.IO

let findParametersForTestCasesInDirectoryPath directoryPath =
    directoryPath
    |> Directory.EnumerateDirectories
    |> Seq.collect findParametersInSubdirectoryPath

let private findParametersInSubdirectoryPath subdirectoryPath =
    let rec getForSubdirectoryPath () =
        seq [
            yield! parametersWhenProjectFileExists |> Option.toList
            yield! subdirectoryPath |> findParametersForTestCasesInDirectoryPath
        ]

    and parametersWhenProjectFileExists =
        let projectFilePath =
            [| subdirectoryPath; "TestCase.csproj" |]
            |> Path.Join

        match projectFilePath |> File.Exists with
        | true -> Some [| projectFilePath |]
        | false -> None

    getForSubdirectoryPath ()