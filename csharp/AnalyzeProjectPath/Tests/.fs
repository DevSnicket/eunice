module DevSnicket.Eunice.AnalyzeProjectPath.Tests

open DevSnicket.Eunice.AnalyzeProjectPath
open DevSnicket.Eunice.AnalyzeProjectPath._Tests.FindParametersForTestCasesInDirectoryPath
open System
open System.IO

[<Xunit.Theory>]
[<Xunit.MemberData ("parametersForTestCases")>]
let testsFromFileSystem (projectFilePath: String) =
    async {
        let projectDirectory =
            projectFilePath
            |> Path.GetDirectoryName

        let expectedPath =
            match Path.Join (projectDirectory, "Expected.yaml") with
            | path when path |> File.Exists ->
                path
            | _ ->
                Path.Join (projectDirectory, "Expected.yaml")

        let! actualLines =
            projectFilePath
            |> analyzeProjectPath

        let actual =
            actualLines
            |> String.concat "\n"

        let! expected =
            expectedPath
            |> File.ReadAllTextAsync
            |> Async.AwaitTask

        if actual <> expected then
            raise (
                Xunit.Sdk.AssertActualExpectedException (
                    "\n" + expected,
                    "\n" + actual,
                    projectDirectory
                )
            )
    }
    
let parametersForTestCases =
    [| ".."; ".."; ".."; "AnalyzeProjectPath"; "Tests"; "TestCases" |]
    |> Path.Join
    |> findParametersForTestCasesInDirectoryPath