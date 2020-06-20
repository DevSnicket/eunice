module rec DevSnicket.Eunice._AnalyzeProject.CreateItemFromMemberSymbol.Tests

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject.CreateItemFromMemberSymbol
open Foq
open Microsoft.CodeAnalysis
open System.Collections.Immutable

// Following scenario can not be recreated using actual member symbols
[<Xunit.Fact>]
let memberOfUnexpectedSymbolReturnsItemWithMetadataName () =
    let metadataName = "Identifier"

    let actual =
        let getSymbolFromSyntaxNode _ =
            failwith "Unexpected call of getSymbolFromSyntaxNode."

        Mock<ISymbol>.With(
            fun symbol ->
            <@
                symbol.DeclaringSyntaxReferences --> ImmutableArray.Create<SyntaxReference>()
                symbol.MetadataName --> metadataName
            @>
        )
        |> createItemFromMemberSymbol getSymbolFromSyntaxNode

    Xunit.Assert.Equal (
        Some
            {
                DependsUpon = []
                Identifier = metadataName
                Items = []
            },
        actual
    )