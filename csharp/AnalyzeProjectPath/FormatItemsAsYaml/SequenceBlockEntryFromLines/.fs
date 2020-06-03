module DevSnicket.Eunice._AnalyzeProjectPath._FormatItemsAsYaml.SequenceBlockEntryFromLines

open DevSnicket.Eunice._AnalyzeProjectPath._FormatItemsAsYaml.IndentLines

let sequenceBlockEntryFromLines lines =
    match lines with
    | [] ->
        seq []
    | head :: tail ->
        seq [
            yield "- " + head
            yield! tail |> indentLines
        ]
