// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
[<System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage>]
module rec DevSnicket.Eunice.ExecuteProgram

open DevSnicket.Eunice.AnalyzeProject
open DevSnicket.Eunice.CallAnalyzeProjectForProjectOrSolutionPath
open DevSnicket.Eunice._ExecuteProgram.FormatHeaderComment
open DevSnicket.Eunice._ExecuteProgram.ParseArgumentsAndInferFromDirectoryPath
open DevSnicket.Eunice._ExecuteProgram.WriteNameAndVersion
open DevSnicket.Eunice.WriteInteractiveInDirectoryPathWithYaml

type Assembly = System.Reflection.Assembly
type Console = System.Console
type Int32 = System.Int32
type String = System.String

[<EntryPoint>]
let executeProgramWithArguments arguments =
    let version = Assembly.GetExecutingAssembly().GetName().Version

    writeNameAndVersion
        {|
            ResetColor = Console.ResetColor
            SetForegroundColor = Console.set_ForegroundColor
            Version = version
            Write = Console.Write
            WriteLine = Console.WriteLine
        |}

    arguments
    |> parseArgumentsAndInferFromDirectoryPath "."
    |> function
        | ParsedArguments parsedArguments ->
            executeProgramWithParsedArguments (parsedArguments, version)
            |> Async.RunSynchronously
        | Error error ->
            error |> Console.Error.WriteLine
            1

let private executeProgramWithParsedArguments (arguments: ParsedArguments, version) =
    async {
        Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
        |> ignore

        let! {
                Errors = errors
                Yaml = yaml
            }
            =
            analyzeProject arguments.MemberBehavior
            |> callAnalyzeProjectForProjectOrSolutionPath arguments.FilePath

        errors |> Seq.iter Console.Error.WriteLine

        do!
            seq [
                formatHeaderComment (DateTime.Now, version)
                yield! yaml
            ]
            |> writeInteractiveInDirectoryPathWithYaml "."

        return 0
    }

let private consoleReadKeyIntercept () =
    Console.ReadKey(true).Key