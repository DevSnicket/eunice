// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._ExecuteProgram.ParseArgumentsAndInferFromDirectoryPath

type Boolean = System.Boolean
type Directory = System.IO.Directory
type MemberBehavior = DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.MemberBehavior
type String = System.String

type ParsedArguments =
    {
        FilePath: String
        IsLicenseAccepted: Boolean
        MemberBehavior: MemberBehavior
    }

type ParsedArgumentsOrError =
    | ParsedArguments of ParsedArguments
    | Error of String

let parseArgumentsAndInferFromDirectoryPath (directoryPath: String) (arguments: String array) =
    let argumentsByName =
        arguments
        |> Seq.groupBy getArgumentNameWhenRecognized
        |> Map.ofSeq

    let hasArgumentOfName argumentName =
        argumentsByName.ContainsKey (Some argumentName)

    argumentsByName.TryFind None
    |> Option.bind Seq.tryLast
    |> Option.orElseWith (fun () -> directoryPath |> inferFileNameWhenInDirectoryPath)
    |> function
        | Some filePath ->
            ParsedArguments
                {
                    FilePath =
                        filePath
                    IsLicenseAccepted =
                        ArgumentNames.AcceptLicense |> hasArgumentOfName
                    MemberBehavior =
                        match ArgumentNames.Members |> hasArgumentOfName with
                        | true -> MemberBehavior.Level
                        | false -> MemberBehavior.None
                }
        | None ->
            Error
                "The current directory does not contain a single C# project or solution file, specify the filename or path."

let private getArgumentNameWhenRecognized =
    function
    | ArgumentNames.AcceptLicense ->
        Some ArgumentNames.AcceptLicense
    | ArgumentNames.Members ->
        Some ArgumentNames.Members
    | _ ->
        None

let private inferFileNameWhenInDirectoryPath directoryPath: String option =
    [ "sln"; "csproj" ]
    |> Seq.tryPick (directoryPath |> getFileNameInDirectoryPathWhenSingleExistsWithExtension)

let private getFileNameInDirectoryPathWhenSingleExistsWithExtension directoryPath extension =
    Directory.EnumerateFiles(
        directoryPath,
        "*." + extension
    )
    |> Seq.tryExactlyOne