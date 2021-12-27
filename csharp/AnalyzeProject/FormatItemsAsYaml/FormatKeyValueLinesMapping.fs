// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatKeyValueLinesMapping

open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.IndentLines

let formatKeyValueLinesMapping (key, valueLines) =
    let withoutBlock value =
        seq [ key + ": " + value ]

    let withBlock lines =
        seq [
            key + ":"
            yield! lines |> indentLines
        ]

    match valueLines with
    | [] -> seq []
    | [ singleLine ] -> singleLine |> withoutBlock
    | _ -> valueLines |> withBlock
