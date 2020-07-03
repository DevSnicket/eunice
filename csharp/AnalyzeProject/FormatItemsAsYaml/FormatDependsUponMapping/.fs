module rec DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatDependsUponMapping

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.QuoteIdentifier
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatKeyValueLinesMapping
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.SequenceBlockEntryFromLines

let formatDependsUponMapping (dependsUpon: DependUpon list) =
    formatKeyValueLinesMapping (
        "dependsUpon",
        dependsUpon |> formatIdentifiableDependsUpon
    )

let private formatIdentifiableDependsUpon dependsUpon =
    dependsUpon
    |> List.filter isIdentifiable
    |> formatDependsUpon

let private formatDependsUpon =
    function
    | [ singleDependUpon ] ->
        singleDependUpon |> formatDependUpon
    | dependsUpon ->
        dependsUpon
        |> Seq.collect (formatDependUpon >> sequenceBlockEntryFromLines)
        |> Seq.toList

let private formatDependUpon dependUpon =
    let identifier = dependUpon.Identifier |> quoteIdentifier

    match dependUpon.Items |> List.filter isIdentifiable with
    | [] ->
        [ identifier ]
    | items ->
        [
            "id: " + identifier
            yield! items |> formatDependUponItemsMapping
        ]

let private isIdentifiable dependUpon =
    dependUpon.Identifier <> ""

let private formatDependUponItemsMapping items =
    formatKeyValueLinesMapping (
        "items",
        items |> formatDependsUpon
    )