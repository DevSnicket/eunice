// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
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
