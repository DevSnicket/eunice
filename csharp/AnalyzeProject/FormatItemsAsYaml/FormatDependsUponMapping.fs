module rec DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatDependsUponMapping

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatKeyValueLinesMapping
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.SequenceBlockEntryFromLines

let formatDependsUponMapping (dependsUpon: DependUpon list) =
    formatKeyValueLinesMapping (
        "dependsUpon",
        formatDependsUpon dependsUpon
    )

let private formatDependsUpon dependsUpon =
    match dependsUpon with
    | [ singleDependUpon ] ->
        formatDependUpon singleDependUpon
    | _ ->
        dependsUpon
        |> Seq.collect (formatDependUpon >> sequenceBlockEntryFromLines)
        |> Seq.toList

let private formatDependUpon dependUpon =
    match dependUpon.Items with
    | [] ->
        [ dependUpon.Identifier ]
    | items ->
        [
            "id: " + dependUpon.Identifier
            yield! formatDependUponItemsMapping items
        ]

let private formatDependUponItemsMapping items =
    formatKeyValueLinesMapping (
        "items",
        formatDependsUpon items
    )