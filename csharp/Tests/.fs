namespace DevSnicket.Eunice.AnalyzeProjectOrSolutionPath

open DevSnicket.Eunice.AnalyzeProject
open DevSnicket.Eunice.CallAnalyzeProjectForProjectOrSolutionPath
open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.FindTestCaseSolutionAndProjectFilePathsInDirectoryPath
open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath._Tests.RegisterAndGetPathOfMsbuild

type File = System.IO.File
type MemberBehavior = DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.MemberBehavior
type Object = System.Object
type Path = System.IO.Path
type String = System.String

type Tests () =
    static let mutable msbuildPath = ""

    static do
        msbuildPath <- registerAndGetPathOfMsbuild

    [<Xunit.Theory>]
    [<Xunit.MemberData ("ParametersForTestCases")>]
    let rec testsFromFileSystem (memberBehavior: MemberBehavior, solutionOrProjectFilePath: String) =
        async {
            let testCaseDirectoryPath =
                solutionOrProjectFilePath
                |> Path.GetDirectoryName

            let! actualErrorsAndYamlLines =
                analyzeProject memberBehavior
                |> callAnalyzeProjectForProjectOrSolutionPath solutionOrProjectFilePath

            let removeProjectDirectoryPathInErrors =
                let absolutionTestCaseDirectoryPath =
                    (testCaseDirectoryPath |> Path.GetFullPath)
                    +
                    string Path.DirectorySeparatorChar

                (fun (errors: String) ->
                    errors.Replace (
                        absolutionTestCaseDirectoryPath,
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
                testCaseDirectoryPath
                |> Path.GetFullPath
                |> readExpectedInDirectory

            if actual <> expected then
                raise (
                    Xunit.Sdk.AssertActualExpectedException (
                        expected,
                        actual,
                        testCaseDirectoryPath
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
                    [|
                        directory
                        "Expected." + extension
                    |]
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
        let rec findParametersForTestCases () =
            seq [
                MemberBehavior.None
                MemberBehavior.Level
            ]
            |> Seq.collect getParametersForGranularity

        and getParametersForGranularity memberBehavior =
            let rec getParameters () =
                memberBehavior |> findSolutionAndProjectFilePathsForMemberBehavior
                |> Seq.map getParametersFromProjectFilePath

            and getParametersFromProjectFilePath projectFilePath =
                [|
                    memberBehavior :> Object
                    projectFilePath :> Object
                |]

            getParameters ()

        and findSolutionAndProjectFilePathsForMemberBehavior memberBehavior =
            [|
                ".."; ".."; "TestCases"
                "Members" + memberBehavior.ToString()
            |]
            |> Path.Join
            |> findTestCaseSolutionAndProjectFilePathsInDirectoryPath

        findParametersForTestCases ()