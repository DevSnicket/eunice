// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetSymbolsReferencedByMember

open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType._GetSymbolsReferencedByMember.GetNamesUsedInSyntaxReference
open Microsoft.CodeAnalysis

let getSymbolsReferencedByMember (getSymbolFromSyntaxNode: SyntaxNode -> ISymbol) ``member`` =
    let rec getTypesReferenced () =
        seq [
            yield! ``member`` |> getTypesWithoutDeclaringSyntaxFromMember
            yield! typesDeclaredInSyntax
        ]
        |> Seq.choose (getElementTypeWhenArray >> ignoreIrrelevant)

    and typesDeclaredInSyntax =
        ``member``.DeclaringSyntaxReferences
        |> Seq.collect getNamesUsedInSyntaxReference
        |> Seq.map getSymbolFromSyntaxNode

    getTypesReferenced ()

let private getTypesWithoutDeclaringSyntaxFromMember: (ISymbol -> ISymbol seq) =
    function
    | :? IEventSymbol as event ->
        seq [ event.Type ]
    | :? IFieldSymbol as field ->
        seq [ field.Type ]
    | _ ->
        seq []

let private getElementTypeWhenArray =
    function
    | :? IArrayTypeSymbol as array ->
        array.ElementType |> getElementTypeWhenArray
    | ``type`` ->
        ``type``

let private ignoreIrrelevant =
    function
    | :? ILocalSymbol ->
        None
    | :? IMethodSymbol as method ->
        match method.MethodKind with
        | MethodKind.LocalFunction ->
            None
        | _ ->
            Some (method :> ISymbol)
    | :? IParameterSymbol ->
        None
    | :? IPropertySymbol as property ->
        match property.ContainingType.IsAnonymousType with
        | true ->
            None
        | false ->
            Some (property :> ISymbol)
    | null ->
        None
    | symbol ->
        match symbol.Kind with
        | SymbolKind.RangeVariable ->
            None
        | _ ->
            Some symbol