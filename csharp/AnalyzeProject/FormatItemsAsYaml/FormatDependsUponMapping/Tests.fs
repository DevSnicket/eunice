module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml._FormatDependsUponMapping.Tests

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.FormatDependsUponMapping
open System

[<Xunit.Fact>]
let IdentifierOfNullIsQuoted () =
    let actual =
        [ {
            Identifier = "null"
            Items = []
        } ]
        |> formatDependsUponMapping

    Xunit.Assert.Equal<String seq>(
        seq [ "dependsUpon: \"null\"" ],
        actual
    )

[<Xunit.Fact>]
let IdentifierOfNullWithChildItemsIsQuoted () =
    let actual =
        [ {
            Identifier =
                "parent"
            Items =
                [ {
                    Identifier = "null"
                    Items = []
                } ]
        } ]
        |> formatDependsUponMapping

    Xunit.Assert.Equal<String seq>(
        seq [
            "dependsUpon:"
            "  id: parent"
            "  items: \"null\""
        ],
        actual
    )