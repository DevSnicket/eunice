module DevSnicket.Eunice.ExecuteProgram.Test

open DevSnicket.Eunice.ExecuteProgram

[<Xunit.Fact>]
let emptyArgumentsAnalysePathNotInvokedReturnsExitCodeOfFailAndLinesOfErrorMessage () =
    let mutable analysePathInvoked = false

    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyseArgumentsIntoExitCodeAndOutputLines
            {|
                AnalysePath = (fun _ -> analysePathInvoked <- true)
                Arguments = [| |]
            |}

    Xunit.Assert.Equal (
        {|
            AnalysePathInvoked = false
            ExitCode = 1
            Lines = seq [ zeroOrManyArgumentsErrorMessage ]
        |},
        {|
            AnalysePathInvoked = analysePathInvoked
            ExitCode = exitCode
            Lines = lines
        |}
    )

[<Xunit.Fact>]
let twoArgumentsAnalysePathNotInvokedReturnsExitCodeOfFailAndLinesOfErrorMessage () =
    let mutable analysePathInvoked = false

    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyseArgumentsIntoExitCodeAndOutputLines
            {|
                AnalysePath = (fun _ -> analysePathInvoked <- true)
                Arguments = [| "argument1"; "argument2" |]
            |}

    Xunit.Assert.Equal (
        {|
            AnalysePathInvoked = false
            ExitCode = 1
            Lines = seq [ zeroOrManyArgumentsErrorMessage ]
        |},
        {|
            AnalysePathInvoked = analysePathInvoked
            ExitCode = exitCode
            Lines = lines
        |}
    )

[<Xunit.Fact>]
let oneArgumentsAnalysePathInvokedReturnsExitCodeOfSuccessAndNoLines () =
    let argument = "argument"
    let mutable pathAnalysed = ""

    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyseArgumentsIntoExitCodeAndOutputLines
            {|
                AnalysePath = (fun path -> pathAnalysed <- path)
                Arguments = [| argument |]
            |}

    Xunit.Assert.Equal (
        {|
            ExitCode = 0
            Lines = seq [ ]
            PathAnalysed = argument
        |},
        {|
            ExitCode = exitCode
            Lines = lines
            PathAnalysed = pathAnalysed
        |}
    )