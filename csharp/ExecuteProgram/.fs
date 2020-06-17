module rec DevSnicket.Eunice.ExecuteProgram

open DevSnicket.Eunice.AnalyzeProject
open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath
open System

type AnalyzeWithArgumentsResult =
    {
        Errors: String seq
        ExitCode: Int32
        Yaml: String seq
    }

[<EntryPoint>]
let executeProgram arguments =
    Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
    |> ignore

    let
        {
            Errors = errors
            ExitCode = exitCode
            Yaml = yaml
        }
        =
        callAnalyzePathWithArguments
            (analyzeProjectOrSolutionPath >> Async.RunSynchronously)
            arguments

    errors |> Seq.iter Console.Error.WriteLine
    yaml |> Seq.iter Console.WriteLine

    exitCode

let callAnalyzePathWithArguments analyzePath arguments =
    match arguments with
    | [| path |] ->
        let errorsAndYaml = path |> analyzePath

        {
            Errors = errorsAndYaml.Errors
            ExitCode = 0
            Yaml = errorsAndYaml.Yaml
        }
    | _ ->
        {
            Errors = seq [ zeroOrManyArgumentsErrorMessage ]
            ExitCode = 1
            Yaml = seq []
        }

let zeroOrManyArgumentsErrorMessage = "Specify the path of a single C# project or solution file."