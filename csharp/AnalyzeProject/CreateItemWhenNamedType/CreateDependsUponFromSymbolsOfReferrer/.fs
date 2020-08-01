module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateDependsUponFromSymbolsOfReferrer

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType._CreateDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.FormatIdentifierOfSymbol
open Microsoft.CodeAnalysis

let createDependsUponFromSymbolsOfReferrer referrer =
    let rec createDependsUponFromSymbols (symbols: ISymbol seq) =
        symbols
        |> Seq.collect getWithTypesOfGenerics
        |> Seq.choose createDependUponFromSymbol
        |> groupDependsUponIntoHierarchy
        |> Seq.toList

    and getWithTypesOfGenerics =
        function
        | :? INamedTypeSymbol as ``type`` ->
            match ``type``.IsGenericType with
            | true ->
                seq [
                    ``type``.ConstructedFrom :> ISymbol
                    yield! ``type``.TypeArguments |> Seq.map (fun ``type`` -> ``type`` :> ISymbol)
                ]
            | false ->
                match ``type``.IsAnonymousType with
                | true ->
                    seq []
                | false ->
                    seq [ ``type`` ]
        | symbol ->
            seq [ symbol ]

    and createDependUponFromSymbol symbol =
        let rec createWhenIdentifiableAndInSource () =
            match isIdentifiableAndInSource with
            | true ->
                {
                    Identifier = symbol |> formatIdentifierOfSymbol
                    Items = []
                }
                |> addAncestorHierarchyOfSymbol symbol
            | false ->
                None

        and isIdentifiableAndInSource =
            symbol.MetadataName <> ""
            &&
            symbol |> hasLocationInSource

        createWhenIdentifiableAndInSource()

    and addAncestorHierarchyOfSymbol symbol dependUpon =
        match symbol.ContainingSymbol with
        | null ->
            Some dependUpon
        | containingSymbol ->
            match
                containingSymbol = referrer
                ||
                referrer |> isSiblingOrHasAncestorSiblingOf symbol with
            | true ->
                Some dependUpon
            | false ->
                let dependUponWithParent =
                    match containingSymbol |> isImplicitSymbol with
                    | true ->
                        dependUpon
                    | false ->
                        {
                            Identifier = containingSymbol |> formatIdentifierOfSymbol
                            Items = [ dependUpon ]
                        }

                addAncestorHierarchyOfSymbol
                    containingSymbol
                    dependUponWithParent

    createDependsUponFromSymbols

let private hasLocationInSource symbol =
    symbol.Locations
    |> Seq.exists (fun location -> location.IsInSource)

let private isSiblingOrHasAncestorSiblingOf subject =
    let rec isSiblingOrHasAncestorSibling (potentialSibling: ISymbol) =
        let noSiblingsWithSameName =
            match potentialSibling with
            | :? INamespaceOrTypeSymbol as namespaceOrType ->
                namespaceOrType.GetMembers()
                |> Seq.forall isSubjectOrHasDifferentName
            | _ ->
                true

        let isSibling =
            subject.ContainingSymbol = potentialSibling.ContainingSymbol

        let hasAncestorSibling =
            potentialSibling.ContainingSymbol |> (not << isNull)
            &&
            potentialSibling.ContainingSymbol |> isSiblingOrHasAncestorSibling

        noSiblingsWithSameName
        &&
        (isSibling || hasAncestorSibling)

    and isSubjectOrHasDifferentName otherSymbol =
        otherSymbol = subject
        ||
        otherSymbol.MetadataName <> subject.MetadataName

    isSiblingOrHasAncestorSibling

let private isImplicitSymbol =
    function
    | :? INamespaceSymbol as ``namespace`` ->
        ``namespace``.IsGlobalNamespace
    | :? IModuleSymbol ->
        true
    | _ ->
        false