module rec DevSnicket.Eunice._ExecuteProgram.ParseArgumentsAndInferFromDirectoryPath

open DevSnicket.Eunice._ExecuteProgram.AcceptLicenseParameter

type Boolean = System.Boolean
type Directory = System.IO.Directory
type String = System.String

type ParsedArguments =
    {
        FilePath: String
        IsLicenseAccepted: Boolean
    }

type ParsedArgumentsOrError =
| ParsedArguments of ParsedArguments
| Error of String

let parseArgumentsAndInferFromDirectoryPath (directoryPath: String) (arguments: String array) =
    let argumentsNotOfAcceptLicense =
        arguments
        |> Array.filter(fun argument -> argument <> acceptLicenseParameter)

    argumentsNotOfAcceptLicense
    |> Array.tryLast
    |> Option.orElseWith (fun () -> directoryPath |> inferFileNameWhenInDirectoryPath)
    |> function
        | Some filePath ->
            ParsedArguments
                {
                    FilePath = filePath
                    IsLicenseAccepted = arguments <> argumentsNotOfAcceptLicense
                }
        | None ->
            Error
                "The current directory does not contain a single C# project or solution file, specify the filename or path."

let private inferFileNameWhenInDirectoryPath directoryPath: String option =
    [ "sln"; "csproj" ]
    |> Seq.tryPick (directoryPath |> getFileNameInDirectoryPathWhenSingleExistsWithExtension)

let private getFileNameInDirectoryPathWhenSingleExistsWithExtension directoryPath extension =
    Directory.EnumerateFiles(
        directoryPath,
        "*." + extension
    )
    |> Seq.tryExactlyOne