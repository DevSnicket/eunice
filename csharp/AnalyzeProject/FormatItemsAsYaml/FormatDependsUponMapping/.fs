module rec DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatDependsUponMapping

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.QuoteIdentifier
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatKeyValueLinesMapping
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.SequenceBlockEntryFromLines

let formatDependsUponMapping (dependsUpon: DependUpon list) =
    formatKeyValueLinesMapping (
        "dependsUpon",
        dependsUpon
        |> List.filter hasIdentifier
        |> formatDependsUpon
    )

let private hasIdentifier dependUpon =
    dependUpon.Identifier <> ""

let private formatDependsUpon dependsUpon =
    match dependsUpon with
    | [ singleDependUpon ] ->
        singleDependUpon |> formatDependUpon
    | _ ->
        dependsUpon
        |> Seq.collect (formatDependUpon >> sequenceBlockEntryFromLines)
        |> Seq.toList

let private formatDependUpon dependUpon =
    let identifier =
        dependUpon.Identifier
        |> quoteIdentifier

    match dependUpon.Items with
    | [] ->
        [ identifier ]
    | items ->
        [
            "id: " + identifier
            yield! items |> formatDependUponItemsMapping
        ]

let private formatDependUponItemsMapping items =
    formatKeyValueLinesMapping (
        "items",
        items |> formatDependsUpon
    )