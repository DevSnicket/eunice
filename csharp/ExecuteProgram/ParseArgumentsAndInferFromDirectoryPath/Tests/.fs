// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
namespace DevSnicket.Eunice._ExecuteProgram._ParseArgumentsAndInferFromDirectoryPath

open global.DevSnicket.Eunice._ExecuteProgram
open DevSnicket.Eunice._ExecuteProgram.ParseArgumentsAndInferFromDirectoryPath

type MemberBehavior = DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.MemberBehavior
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
                ".."; ".."; ".."; ".."; "ExecuteProgram"; "ParseArgumentsAndInferFromDirectoryPath"; "Tests"; "TestCases"
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
                        MemberBehavior = MemberBehavior.None
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
                        MemberBehavior = MemberBehavior.None
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
                        MemberBehavior = MemberBehavior.None
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
                        MemberBehavior = MemberBehavior.None
                    }
            |}
            {|
                Arguments =
                    [| ArgumentNames.Members; "filePathArgument" |]
                DirectoryPath =
                    [ "Other" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = "filePathArgument"
                        IsLicenseAccepted = false
                        MemberBehavior = MemberBehavior.Level
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
                        MemberBehavior = MemberBehavior.None
                    }
            |}
            {|
                Arguments =
                    [| ArgumentNames.AcceptLicense |]
                DirectoryPath =
                    [ "Other" ] |> getPathFromNames
                Expected =
                    Error projectOrSolutionFileNotFoundOrSpecifiedError
            |}
            {|
                Arguments =
                    [|
                        ArgumentNames.AcceptLicense
                        "filePathArgument"
                    |]
                DirectoryPath =
                    [ "Other" ] |> getPathFromNames
                Expected =
                    ParsedArguments {
                        FilePath = "filePathArgument"
                        IsLicenseAccepted = true
                        MemberBehavior = MemberBehavior.None
                    }
            |}
        ]
        |> Seq.map (fun testCase ->
            [|
                testCase.Arguments :> Object
                testCase.DirectoryPath :> Object
                testCase.Expected :> Object
            |])