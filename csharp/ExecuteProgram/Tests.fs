module DevSnicket.Eunice.ExecuteProgram.Tests

open DevSnicket.Eunice.ExecuteProgram

[<Xunit.Fact>]
let emptyArgumentsAnalyzePathNotInvokedReturnsExitCodeOfFailAndLinesOfErrorMessage () =
    let mutable analyzePathInvoked = false

    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyzeArgumentsIntoExitCodeAndOutputLines
            {|
                AnalyzePath = (fun _ -> analyzePathInvoked <- true; seq [])
                Arguments = [| |]
            |}

    Xunit.Assert.Equal (
        {|
            AnalyzePathInvoked = false
            ExitCode = 1
            Lines = seq [ zeroOrManyArgumentsErrorMessage ]
        |},
        {|
            AnalyzePathInvoked = analyzePathInvoked
            ExitCode = exitCode
            Lines = lines
        |}
    )

[<Xunit.Fact>]
let twoArgumentsAnalyzePathNotInvokedReturnsExitCodeOfFailAndLinesOfErrorMessage () =
    let mutable analyzePathInvoked = false

    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyzeArgumentsIntoExitCodeAndOutputLines
            {|
                AnalyzePath = (fun _ -> analyzePathInvoked <- true; seq [])
                Arguments = [| "argument1"; "argument2" |]
            |}

    Xunit.Assert.Equal (
        {|
            AnalyzePathInvoked = false
            ExitCode = 1
            Lines = seq [ zeroOrManyArgumentsErrorMessage ]
        |},
        {|
            AnalyzePathInvoked = analyzePathInvoked
            ExitCode = exitCode
            Lines = lines
        |}
    )

[<Xunit.Fact>]
let oneArgumentsAnalyzePathInvokedReturnsExitCodeOfSuccessAndNoLines () =
    let analysisLines = seq [ "analysis output" ]
    let argument = "argument"
    let mutable pathAnalyzed = ""

    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyzeArgumentsIntoExitCodeAndOutputLines
            {|
                AnalyzePath = (fun path -> pathAnalyzed <- path; analysisLines)
                Arguments = [| argument |]
            |}

    Xunit.Assert.Equal (
        {|
            ExitCode = 0
            Lines = analysisLines
            PathAnalyzed = argument
        |},
        {|
            ExitCode = exitCode
            Lines = lines
            PathAnalyzed = pathAnalyzed
        |}
    )