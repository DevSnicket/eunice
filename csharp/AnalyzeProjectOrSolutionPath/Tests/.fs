namespace DevSnicket.Eunice.AnalyzeProjectOrSolutionPath

open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.FindParametersForTestCasesInDirectoryPath
open System
open System.IO

type Tests () =
    static do
        Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
        |> ignore

    [<Xunit.Theory>]
    [<Xunit.MemberData ("ParametersForTestCases")>]
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
                |> analyzeProjectOrSolutionPath

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
        
    static member ParametersForTestCases =
        [| ".."; ".."; ".."; "AnalyzeProjectOrSolutionPath"; "Tests"; "TestCases" |]
        |> Path.Join
        |> findParametersForTestCasesInDirectoryPath