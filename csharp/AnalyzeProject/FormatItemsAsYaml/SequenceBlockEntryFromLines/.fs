module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.SequenceBlockEntryFromLines

open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.IndentLines

let sequenceBlockEntryFromLines lines =
    match lines with
    | [] ->
        seq []
    | head :: tail ->
        seq [
            yield "- " + head
            yield! tail |> indentLines
        ]
