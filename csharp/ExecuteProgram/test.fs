module DevSnicket.Eunice.ExecuteProgram.Test

open DevSnicket.Eunice.ExecuteProgram

[<Xunit.Fact>]
let noArgumentsReturnsExitCodeSuccess () =
    Xunit.Assert.Equal (
        0,
        executeProgram [| |]
    )