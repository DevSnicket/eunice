module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWithoutMembers

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateDependsUponFromSymbolsOfReferrer
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWhenDelegateOrEnumOrGetNamedType
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetBasesOfTypeDeclaration
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetSymbolsReferencedByMember
open Microsoft.CodeAnalysis

let createItemWithoutMembers getSymbolFromSyntaxNode: (ISymbol -> Item option) =
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
                seq [
                    yield!
                        namedType
                        |> getBasesOfTypeDeclaration
                        |> Seq.cast
                    yield!
                        namedType.GetMembers()
                        |> Seq.collect getNamedTypesReferencedByMember
                        |> Seq.except (seq [ namedType ])
                        |> Seq.cast
                ]
                |> createDependsUponFromSymbolsOfReferrer namedType
            Identifier =
                namedType.MetadataName
            Items =
                namedType.GetMembers ()
                |> Seq.choose createItemWhenNamedType
                |> Seq.toList
        }

    and getNamedTypesReferencedByMember =
        (getSymbolFromSyntaxNode |> getSymbolsReferencedByMember)
        >> Seq.map getNamedTypeOfSymbol

    createItemWhenNamedType

let private getNamedTypeOfSymbol =
    function
    | :? INamedTypeSymbol as namedType ->
        namedType
    | symbol ->
        symbol.ContainingType