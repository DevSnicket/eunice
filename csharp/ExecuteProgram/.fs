module rec DevSnicket.Eunice.ExecuteProgram

open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath
open DevSnicket.Eunice._ExecuteProgram.GetOrPromptForLicenseAcceptance
open DevSnicket.Eunice._ExecuteProgram.ParseArgumentsAndInferFromDirectoryPath
open DevSnicket.Eunice._ExecuteProgram.WriteNameAndVersion
open DevSnicket.Eunice.WriteInteractiveInDirectoryPathWithYaml

type Assembly = System.Reflection.Assembly
type Console = System.Console
type Int32 = System.Int32
type String = System.String

[<EntryPoint>]
let executeProgramWithArguments arguments =
    writeNameAndVersion
        {|
            ResetColor = Console.ResetColor
            SetForegroundColor = Console.set_ForegroundColor
            Version = Assembly.GetExecutingAssembly().GetName().Version
            Write = Console.Write
            WriteLine = Console.WriteLine
        |}

    arguments
    |> parseArgumentsAndInferFromDirectoryPath "."
    |> function
        | ParsedArguments parsedArguments ->
            parsedArguments
            |> executeProgramWithParsedArguments
            |> Async.RunSynchronously
        | Error error ->
            error |> Console.Error.WriteLine
            1

let private executeProgramWithParsedArguments (arguments: ParsedArguments) =
    async {
        let! isLicenseAccepted =
            getOrPromptForLicenseAcceptance
                {|
                    IsAcceptedInArguments = arguments.IsLicenseAccepted
                    IsInteractive = not <| Console.IsOutputRedirected
                    ReadKey = consoleReadKeyIntercept
                    WriteLine = Console.WriteLine
                |}

        if isLicenseAccepted then
            Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
            |> ignore

            let! {
                    Errors = errors
                    Yaml = yaml
                }
                =
                arguments.FilePath
                |> analyzeProjectOrSolutionPath

            errors |> Seq.iter Console.Error.WriteLine
            do! yaml |> writeInteractiveInDirectoryPathWithYaml "."

            return 0
        else
            return 1
    }

let private consoleReadKeyIntercept () =
    Console.ReadKey(true).Key