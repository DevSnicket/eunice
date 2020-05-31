module rec DevSnicket.Eunice.ExecuteProgram

open System

type LinesAndStatus =
    {
        ExitCode: Int32
        Lines: String seq
    }

[<EntryPoint>]
let executeProgram arguments =
    let
        {
            ExitCode = exitCode
            Lines = lines
        }
        =
        analyseArgumentsIntoExitCodeAndOutputLines
            {|
                AnalysePath = (fun _ -> ())
                Arguments = arguments
            |}

    lines |> Seq.iter Console.WriteLine

    exitCode

let analyseArgumentsIntoExitCodeAndOutputLines
    (
        parameters:
            {|
                AnalysePath: String -> unit
                Arguments: String array
            |}
    ) =
    match parameters.Arguments with
    | [| path |] ->
        path |> parameters.AnalysePath
        {
            ExitCode = 0
            Lines = seq []
        }
    | _ ->
        {
            ExitCode = 1
            Lines = seq [ zeroOrManyArgumentsErrorMessage ]
        }

let zeroOrManyArgumentsErrorMessage = "Specify the path of a single C# project file."