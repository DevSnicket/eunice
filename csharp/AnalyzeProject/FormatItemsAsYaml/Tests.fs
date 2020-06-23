module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.Tests

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject.FormatItemsAsYaml
open System

[<Xunit.Fact>]
let IdentifierOfNullIsQuotedInEmptyItem () =
    let actual =
        [ {
            DependsUpon = []
            Identifier = "null"
            Items = []
        } ]
        |> formatItemsAsYaml

    Xunit.Assert.Equal<String seq>(
        seq [ "- \"null\"" ],
        actual
    )

[<Xunit.Fact>]
let IdentifierOfNullIsQuotedInItemWithChildItems () =
    let actual =
        [ {
            DependsUpon = []
            Identifier = "null"
            Items = [ {
                DependsUpon = []
                Identifier = "child"
                Items = []
            }]
        } ]
        |> formatItemsAsYaml

    Xunit.Assert.Equal<String seq>(
        seq [
            "- id: \"null\""
            "  items: child"
        ],
        actual
    )

[<Xunit.Fact>]
let IdentifierOfNullIsQuotedInDependsUpon () =
    let actual =
        [ {
            DependsUpon =
                [ {
                    Identifier = "null"
                    Items = []
                } ]
            Identifier =
                "item"
            Items =
                []
        } ]
        |> formatItemsAsYaml

    Xunit.Assert.Equal<String seq>(
        seq [
            "- id: item"
            "  dependsUpon: \"null\""
        ],
        actual
    )

[<Xunit.Fact>]
let IdentifierOfNullIsQuotedInDependsUponWithChildItems () =
    let actual =
        [ {
            DependsUpon =
                [ {
                    Identifier =
                        "parent"
                    Items =
                        [ {
                            Identifier = "null"
                            Items = []
                        } ]
                } ]
            Identifier = "item"
            Items = []
        } ]
        |> formatItemsAsYaml

    Xunit.Assert.Equal<String seq>(
        seq [
            "- id: item"
            "  dependsUpon:"
            "    id: parent"
            "    items: \"null\""
        ],
        actual
    )