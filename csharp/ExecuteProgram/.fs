module rec DevSnicket.Eunice.ExecuteProgram

open DevSnicket.Eunice.AnalyzeProjectPath
open System

type LinesAndStatus =
    {
        ExitCode: Int32
        Lines: String seq
    }

[<EntryPoint>]
let executeProgram arguments =
    Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
    |> ignore

    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyzeArgumentsIntoExitCodeAndOutputLines
            {|
                AnalyzePath =
                    analyzeProjectPath
                    >> Async.RunSynchronously
                Arguments =
                    arguments
            |}

    lines |> Seq.iter Console.WriteLine

    exitCode

let analyzeArgumentsIntoExitCodeAndOutputLines
    (
        parameters:
            {|
                AnalyzePath: String -> String seq
                Arguments: String array
            |}
    ) =
    match parameters.Arguments with
    | [| path |] ->
        {
            ExitCode = 0
            Lines = path |> parameters.AnalyzePath
        }
    | _ ->
        {
            ExitCode = 1
            Lines = seq [ zeroOrManyArgumentsErrorMessage ]
        }

let zeroOrManyArgumentsErrorMessage = "Specify the path of a single C# project file."