// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWithMembers

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateDependsUponFromSymbolsOfReferrer
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWhenDelegateOrEnumOrGetNamedType
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.FormatIdentifierOfSymbol
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetBasesOfTypeDeclaration
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetImplementationOfMember
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetSymbolsReferencedByMember
open Microsoft.CodeAnalysis

let createItemWithMembers getSymbolFromSyntaxNode: (ISymbol -> Item option) =
    let rec createItemWhenNamedType symbol =
        symbol
        |> createItemWhenDelegateOrEnumOrGetNamedType
        |> Option.map (
            function
            | ItemOfDelegateOrEnum item ->
                item
            | NamedTypeNotOfDelegateOrEnum namedType ->
                namedType |> createItemFromNamedTypeNotOfDelegateOrEnum
        )

    and createItemFromNamedTypeNotOfDelegateOrEnum namedType =
        {
            DependsUpon =
                namedType
                |> getBasesOfTypeDeclaration
                |> Seq.cast
                |> createDependsUponFromSymbolsOfReferrer namedType
            Identifier =
                namedType.MetadataName
            Items =
                namedType.GetMembers ()
                |> Seq.choose createItemFromMemberOrNestedType
                |> Seq.toList
        }

    and createItemFromMemberOrNestedType memberOrNestedType =
        let rec createItemFromMemberOrNestedType () =
            whenNestedType
            |> Option.orElseWith fromMember
        
        and whenNestedType =
            memberOrNestedType
            |> createItemWhenNamedType

        and fromMember () =
            memberOrNestedType
            |> getImplementationOfMember
            |> Option.map createItemFromMemberImplementation

        createItemFromMemberOrNestedType ()

    and createItemFromMemberImplementation ``member`` =
        {
            DependsUpon =
                ``member``
                |> getSymbolsReferencedByMember getSymbolFromSyntaxNode
                |> createDependsUponFromSymbolsOfReferrer ``member``
            Identifier =
                ``member`` |> formatIdentifierOfSymbol
            Items =
                []
        }

    createItemWhenNamedType