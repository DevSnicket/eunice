// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
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