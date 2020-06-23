module rec DevSnicket.Eunice._AnalyzeProject.FormatItemsAsYaml

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.QuoteIdentifier
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatDependsUponMapping
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatKeyValueLinesMapping
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.SequenceBlockEntryFromLines

let formatItemsAsYaml items =
    items
    |> Seq.collect (formatItem >> sequenceBlockEntryFromLines)

let private formatItem item =
    let identifier =
        item.Identifier
        |> quoteIdentifier

    let mappingLines =
        [
            yield! formatDependsUponMapping item.DependsUpon
            yield! formatChildItemsMapping item.Items
        ]

    match mappingLines with
    | [] ->
        [ identifier ]
    | _ ->
        [
            "id: " + identifier
            yield! mappingLines
        ]

let private formatChildItemsMapping itemOrItems =
    let valueLines =
        match itemOrItems with
        | [] -> []
        | [ item ] -> formatItem item
        | _ -> formatItemsAsYaml itemOrItems |> Seq.toList

    formatKeyValueLinesMapping ("items", valueLines)