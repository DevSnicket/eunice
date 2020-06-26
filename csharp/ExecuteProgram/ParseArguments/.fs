module rec DevSnicket.Eunice._ExecuteProgram.ParseArguments

open DevSnicket.Eunice._ExecuteProgram.AcceptLicenseParameter

type Boolean = System.Boolean
type String = System.String

type ParsedArguments =
    {
        FilePath: String
        IsLicenseAccepted: Boolean
    }

type ParsedArgumentsOrError =
| ParsedArguments of ParsedArguments
| Error of String

let parseArguments (arguments: String array) =
    let argumentsNotOfAcceptLicense =
        arguments
        |> Array.filter(fun argument -> argument <> acceptLicenseParameter)

    argumentsNotOfAcceptLicense
    |> Array.tryLast
    |> function
        | Some filePath ->
            ParsedArguments
                {
                    FilePath = filePath
                    IsLicenseAccepted = arguments <> argumentsNotOfAcceptLicense
                }
        | None ->
            Error
                filePathNotSpecifiedError

let filePathNotSpecifiedError = "Specify the path of a single C# project or solution file."