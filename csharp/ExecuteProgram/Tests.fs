module rec DevSnicket.Eunice.ExecuteProgram.Tests

open DevSnicket.Eunice.ExecuteProgram
open System

type ZeroOrTwoArgumentsTests () =
    [<Xunit.Theory>]
    [<Xunit.MemberData ("ParametersForTestCases")>]
    let rec analyzePathNotInvokedReturnsExitCodeOfFailAndOutputOfErrorMessage arguments =
        let mutable analyzePathInvoked = false

        let analyzePath (_: String): DevSnicket.Eunice.AnalysisResult =
            analyzePathInvoked <- true
            {
                Errors = seq []
                Yaml = seq []
            }

        let
            {
                Errors = errors
                ExitCode = exitCode
                Yaml = yaml
            }
            =
            callAnalyzePathWithArguments
                analyzePath
                arguments

        Xunit.Assert.Equal (
            {|
                AnalyzePathInvoked = false
                Errors = seq [ zeroOrManyArgumentsErrorMessage ]
                ExitCode = 1
                Yaml = seq []
            |},
            {|
                AnalyzePathInvoked = analyzePathInvoked
                Errors = errors
                ExitCode = exitCode
                Yaml = yaml
            |}
        )

    static member ParametersForTestCases =
        seq [
            [| [| |] |]
            [| [| "argument1"; "argument2" |] |]
        ]

[<Xunit.Fact>]
let oneArgumentAnalyzePathInvokedReturnsExitCodeOfSuccessAndNoLines () =
    let expectedErrors = seq []
    let expectedYaml = seq [ "analysis output" ]
    let argument = "argument"
    let mutable pathAnalyzed = ""

    let analyzePath path: DevSnicket.Eunice.AnalysisResult =
        pathAnalyzed <- path
        {
            Errors = expectedErrors
            Yaml = expectedYaml
        }

    let
        {
            Errors = errors
            ExitCode = exitCode
            Yaml = yaml
        }
        =
        callAnalyzePathWithArguments
            analyzePath
            [| argument |]

    Xunit.Assert.Equal (
        {|
            Errors = expectedErrors
            ExitCode = 0
            PathAnalyzed = argument
            Yaml = expectedYaml
        |},
        {|
            Errors = errors
            ExitCode = exitCode
            PathAnalyzed = pathAnalyzed
            Yaml = yaml
        |}
    )