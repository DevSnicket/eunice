module rec DevSnicket.Eunice._ExecuteProgram.GetOrPromptForLicenseAcceptance

open DevSnicket.Eunice._ExecuteProgram.AcceptLicenseParameter
open DevSnicket.Eunice._ExecuteProgram._GetOrPromptForLicenseAcceptance.CommercialUseText

type Assembly = System.Reflection.Assembly
type Boolean = System.Boolean
type ConsoleKey = System.ConsoleKey
type StreamReader = System.IO.StreamReader
type String = System.String

let getOrPromptForLicenseAcceptance
    (parameter:
    {|
        IsAcceptedInArguments: Boolean
        IsInteractive: Boolean
        ReadKey: unit -> ConsoleKey
        WriteLine: String -> unit
    |}) =
    parameter |> whenAcceptedInProcessArguments
    ||
    parameter |> instructOrPrompt

let private whenAcceptedInProcessArguments parameter =
    if parameter.IsAcceptedInArguments then
        "By specifying " + acceptLicenseParameter + " you have accepted " + licenseUrlText
        |> parameter.WriteLine

        commercialUseText
        |> parameter.WriteLine

    parameter.IsAcceptedInArguments

let private instructOrPrompt parameter =
    for line in
        seq [
            "To use this program you must accept " + licenseUrlText
            commercialUseText
            ""
        ] do
        line |> parameter.WriteLine

    if parameter.IsInteractive then
        parameter |> prompt
    else
        "To accept run again with the " + acceptLicenseParameter + " argument."
        |> parameter.WriteLine

        false

let private prompt parameter =
    let rec prompt () =
        for line in
            seq [
                "To accept, press the A key or run again with the " + acceptLicenseParameter + " argument."
                "Press the V key to view the license."
                "Any other key will exit without accepting the license."
                ""
            ] do
            line |> parameter.WriteLine

        parameter.ReadKey()
        |> function
            | ConsoleKey.V ->
                viewLicense ()
            | ConsoleKey.A ->
                true
            | _ ->
                false

    and viewLicense () =
        for line in
            seq [
                yield! license
                ""
            ] do
            line |> parameter.WriteLine

        prompt ()

    prompt ()

let private license =
    let stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("DevSnicket.Eunice.LICENSE")
    use streamReader = new StreamReader(stream)
    streamReader.ReadToEnd().Split("\n");

let licenseUrlText = "the license http://www.devsnicket.com/eunice/licensing"