module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemFromMember.Tests

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemFromMember
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
                symbol.DeclaringSyntaxReferences -->
                    ImmutableArray.Create<SyntaxReference>()
                symbol.MetadataName -->
                    metadataName
            @>
        )
        |> createItemFromMember getSymbolFromSyntaxNode

    Xunit.Assert.Equal (
        Some
            {
                DependsUpon = []
                Identifier = metadataName
                Items = []
            },
        actual
    )