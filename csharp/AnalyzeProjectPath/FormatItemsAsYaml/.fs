module rec DevSnicket.Eunice._AnalyzeProjectPath.FormatItemsAsYaml

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath._FormatItemsAsYaml.FormatKeyValueLinesMapping
open DevSnicket.Eunice._AnalyzeProjectPath._FormatItemsAsYaml.SequenceBlockEntryFromLines

let formatItemsAsYaml items =
    items
    |> Seq.collect (formatItem >> sequenceBlockEntryFromLines)

let private formatItem item =
    let mappingLines =
        formatChildItemsMapping item.Items
        |> Seq.toList

    match mappingLines with
    | [] ->
        [ item.Identifier ]
    | _ ->
        [
            "id: " + item.Identifier
            yield! mappingLines
        ]

let private formatChildItemsMapping itemOrItems =
    let valueLines =
        match itemOrItems with
        | [] -> []
        | [ item ] -> formatItem item
        | _ -> formatItemsAsYaml itemOrItems |> Seq.toList

    formatKeyValueLinesMapping ("items", valueLines)