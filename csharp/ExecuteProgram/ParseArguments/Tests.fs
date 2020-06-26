namespace DevSnicket.Eunice._ExecuteProgram._ParseArguments

open DevSnicket.Eunice._ExecuteProgram.AcceptLicenseParameter
open DevSnicket.Eunice._ExecuteProgram.ParseArguments
open DevSnicket.Eunice._ExecuteProgram._ParseArguments.FilePathNotSpecifiedError

type Object = System.Object

type Tests () =
    [<Xunit.Theory>]
    [<Xunit.MemberData ("ArgumentsAndExpectedOfTestCases")>]
    let testArgumentAndExpected (arguments, expected) =
        Xunit.Assert.Equal (
            expected,
            arguments |> parseArguments
        )

    static member ArgumentsAndExpectedOfTestCases =
        seq [
            {|
                Arguments =
                    [||]
                Expected =
                    Error filePathNotSpecifiedError
            |}
            {|
                Arguments =
                    [| "filePath" |]
                Expected =
                    ParsedArguments {
                        FilePath = "filePath"
                        IsLicenseAccepted = false
                    }
            |}
            {|
                Arguments =
                    [| acceptLicenseParameter |]
                Expected =
                    Error filePathNotSpecifiedError
            |}
            {|
                Arguments =
                    [|
                        acceptLicenseParameter
                        "filePath"
                    |]
                Expected =
                    ParsedArguments {
                        FilePath = "filePath"
                        IsLicenseAccepted = true
                    }
            |}
        ]
        |> Seq.map (fun testCase ->
            [|
                testCase.Arguments :> Object
                testCase.Expected :> Object
            |])