namespace DevSnicket.Eunice._ExecuteProgram._ParseArgumentsAndInferFromDirectoryPath

open DevSnicket.Eunice._ExecuteProgram.AcceptLicenseParameter
open DevSnicket.Eunice._ExecuteProgram.ParseArgumentsAndInferFromDirectoryPath

type Object = System.Object
type Path = System.IO.Path

type Tests () =
    [<Xunit.Theory>]
    [<Xunit.MemberData ("TestCases")>]
    let testArgumentAndExpected (arguments, directoryPath, expected) =
        Xunit.Assert.Equal (
            expected,
            arguments |> parseArgumentsAndInferFromDirectoryPath directoryPath
        )

    static member TestCases =
        let getPathFromNames names =
            [|
                ".."; ".."; ".."; "ExecuteProgram"; "ParseArgumentsAndInferFromDirectoryPath"; "Tests"; "TestCases"
                yield! names
            |]
            |> Path.Join

        let projectOrSolutionFileNotFoundOrSpecifiedError =
            "The current directory does not contain a single C# project or solution file, specify the filename or path."

        seq [
            {|
                Arguments =
                    [||]
                DirectoryPath =
                    [ "Other" ] |> getPathFromNames
                Expected =
                    Error projectOrSolutionFileNotFoundOrSpecifiedError
            |}
            {|
                Arguments =
                    [||]
                DirectoryPath =
                    [ "MultipleProjects" ] |> getPathFromNames
                Expected =
                    Error projectOrSolutionFileNotFoundOrSpecifiedError
            |}
            {|
                Arguments =
                    [||]
                DirectoryPath =
                    [ "MultipleSolutions" ] |> getPathFromNames
                Expected =
                    Error projectOrSolutionFileNotFoundOrSpecifiedError
            |}
            {|
                Arguments =
                    [||]
                DirectoryPath =
                    [ "SingleProject" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = [ "SingleProject"; "SingleProject.csproj" ] |> getPathFromNames
                        IsLicenseAccepted = false
                    }
            |}
            {|
                Arguments =
                    [||]
                DirectoryPath =
                    [ "SingleProjectAndSingleSolution" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = [ "SingleProjectAndSingleSolution"; "SingleSolution.sln" ] |> getPathFromNames
                        IsLicenseAccepted = false
                    }
            |}
            {|
                Arguments =
                    [||]
                DirectoryPath =
                    [ "SingleSolution" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = [ "SingleSolution"; "SingleSolution.sln" ] |> getPathFromNames
                        IsLicenseAccepted = false
                    }
            |}
            {|
                Arguments =
                    [| "filePathArgument" |]
                DirectoryPath =
                    [ "Other" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = "filePathArgument"
                        IsLicenseAccepted = false
                    }
            |}
            {|
                Arguments =
                    [| "filePathArgument" |]
                DirectoryPath =
                    [ "SingleProject" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = "filePathArgument"
                        IsLicenseAccepted = false
                    }
            |}
            {|
                Arguments =
                    [| acceptLicenseParameter |]
                DirectoryPath =
                    [ "Other" ] |> getPathFromNames
                Expected =
                    Error projectOrSolutionFileNotFoundOrSpecifiedError
            |}
            {|
                Arguments =
                    [|
                        acceptLicenseParameter
                        "filePathArgument"
                    |]
                DirectoryPath =
                    [ "Other" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = "filePathArgument"
                        IsLicenseAccepted = true
                    }
            |}
        ]
        |> Seq.map (fun testCase ->
            [|
                testCase.Arguments :> Object
                testCase.DirectoryPath :> Object
                testCase.Expected :> Object
            |])