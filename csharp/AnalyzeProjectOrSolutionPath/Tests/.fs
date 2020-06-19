namespace DevSnicket.Eunice.AnalyzeProjectOrSolutionPath

open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.FindParametersForTestCasesInDirectoryPath
open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.RegisterAndGetPathOfMsbuild

type File = System.IO.File
type Path = System.IO.Path
type String = System.String

type Tests () =
    static let mutable msbuildPath = ""

    static do
        msbuildPath <- registerAndGetPathOfMsbuild

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

            let removeProjectDirectoryPathInErrors =
                let absolutionProjectDirectoryPath =
                    (projectDirectoryPath |> Path.GetFullPath)
                    +
                    string Path.DirectorySeparatorChar

                (fun (errors: String) ->
                    errors.Replace (
                        absolutionProjectDirectoryPath,
                        ""
                    )
                )

            let actual =
                formatErrorsAndYaml
                    (
                        actualErrorsAndYamlLines.Errors
                        |> formatLines
                        |> removeProjectDirectoryPathInErrors
                        |> removeMsbuildPathInErrors
                        |> replaceBackSlashesWithForwardInErrors
                    )
                    (
                        actualErrorsAndYamlLines.Yaml
                        |> formatLines
                    )

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

    and removeMsbuildPathInErrors errors =
        errors.Replace (
            msbuildPath,
            ""
        )

    and replaceBackSlashesWithForwardInErrors errors =
        errors.Replace (
            "\\",
            "/"
        )

    and readExpectedInDirectory directory =
        async {
            let readExpectedFileWithExtensionWhenExists extension =
                let expectedFilePath =
                    [| directory; "Expected." + extension |]
                    |> Path.Join

                match expectedFilePath |> File.Exists with
                | true ->
                    expectedFilePath
                    |> File.ReadAllTextAsync
                    |> Async.AwaitTask
                | false ->
                    async.Return ""

            let! errors = "errors" |> readExpectedFileWithExtensionWhenExists
            let! yaml = "yaml" |> readExpectedFileWithExtensionWhenExists

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
        |> formatLines

    and formatLines =
        String.concat "\n"

    static member ParametersForTestCases =
        [| ".."; ".."; ".."; "AnalyzeProjectOrSolutionPath"; "Tests"; "TestCases" |]
        |> Path.Join
        |> findParametersForTestCasesInDirectoryPath