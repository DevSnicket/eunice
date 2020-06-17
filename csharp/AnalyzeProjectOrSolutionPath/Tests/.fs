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
    let rec testsFromFileSystem (projectFilePath: String) =
        async {
            let projectDirectoryPath =
                projectFilePath
                |> Path.GetDirectoryName
            
            let! actualErrorsAndYamlLines =
                projectFilePath
                |> analyzeProjectOrSolutionPath

            let actual =
                formatErrorsAndYaml
                    (actualErrorsAndYamlLines.Errors |> String.concat "\n")
                    (actualErrorsAndYamlLines.Yaml |> String.concat "\n")

            let! expected =
                projectDirectoryPath
                |> Path.GetFullPath
                |> readExpectedInDirectory

            if actual <> expected then
                raise (
                    Xunit.Sdk.AssertActualExpectedException (
                        expected,
                        actual,
                        projectDirectoryPath
                    )
                )
        }

    and readExpectedInDirectory directory =
        async {
            let! errors =
                let getPathOfFileName fileName =
                    [| directory; fileName |]
                    |> Path.Join

                let errorsPath =
                    "Expected.errors" |> getPathOfFileName

                match errorsPath |> File.Exists with
                | true ->
                    async {
                        let! errors =
                            errorsPath
                            |> File.ReadAllLinesAsync
                            |> Async.AwaitTask

                        return
                            errors
                            |> Seq.map getPathOfFileName
                            |> String.concat "\n"
                    }
                | false ->
                    async.Return ""

            let! yaml =
                [| directory; "Expected.yaml" |]
                |> Path.Join
                |> File.ReadAllTextAsync
                |> Async.AwaitTask

            return formatErrorsAndYaml errors yaml
        }

    and formatErrorsAndYaml errors yaml =
        seq [
            ""
            "Errors:"
            errors
            "Yaml:"
            yaml
        ]
        |> String.concat "\n"

    static member ParametersForTestCases =
        [| ".."; ".."; ".."; "AnalyzeProjectOrSolutionPath"; "Tests"; "TestCases" |]
        |> Path.Join
        |> findParametersForTestCasesInDirectoryPath