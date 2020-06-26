module rec DevSnicket.Eunice.ExecuteProgram

open DevSnicket.Eunice.AnalyzeProjectOrSolutionPath
open DevSnicket.Eunice._ExecuteProgram.GetOrPromptForLicenseAcceptance
open DevSnicket.Eunice._ExecuteProgram.ParseArguments
open DevSnicket.Eunice._ExecuteProgram.WriteNameAndVersion

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
    |> parseArguments
    |> function
        | ParsedArguments parsedArguments ->
            parsedArguments |> executeProgramWithParsedArguments
        | Error error ->
            error |> Console.Error.WriteLine
            1

let private executeProgramWithParsedArguments (arguments: ParsedArguments) =
    if getOrPromptForLicenseAcceptance
        {|
            IsAcceptedInArguments = arguments.IsLicenseAccepted
            IsInteractive = not <| Console.IsOutputRedirected
            ReadKey = consoleReadKeyIntercept
            WriteLine = Console.WriteLine
        |}
    then
        Microsoft.Build.Locator.MSBuildLocator.RegisterDefaults ()
        |> ignore

        let {
                Errors = errors
                Yaml = yaml
            }
            =
            arguments.FilePath
            |> analyzeProjectOrSolutionPath
            |> Async.RunSynchronously

        errors |> Seq.iter Console.Error.WriteLine
        yaml |> Seq.iter Console.WriteLine

        0
    else
        1

let private consoleReadKeyIntercept () =
    Console.ReadKey(true).Key