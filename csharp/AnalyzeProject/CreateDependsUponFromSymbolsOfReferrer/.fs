module rec DevSnicket.Eunice._AnalyzeProject.CreateDependsUponFromSymbolsOfReferrer

open DevSnicket.Eunice._AnalyzeProject._CreateDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy
open DevSnicket.Eunice._AnalyzeProject.FormatIdentifierFromMethodSymbol
open Microsoft.CodeAnalysis

let createDependsUponFromSymbolsOfReferrer (referrer: ISymbol) =
    let rec createDependsUponFromSymbols (symbols: ISymbol seq) =
        symbols
        |> Seq.collect ignoreLocalAndGetWithTypesOfGenerics
        |> Seq.choose createDependUponFromSymbol
        |> groupDependsUponIntoHierarchy
        |> Seq.toList

    and ignoreLocalAndGetWithTypesOfGenerics =
        function
        | :? ILocalSymbol ->
            seq []
        | :? IMethodSymbol as method ->
            match method.MethodKind with
            | MethodKind.LocalFunction ->
                seq []
            | _ ->
                seq [ method :> ISymbol ]
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
        | :? IParameterSymbol ->
            seq []
        | :? IPropertySymbol as property ->
            match property.ContainingType.IsAnonymousType with
            | true ->
                seq []
            | false ->
                seq [ property :> ISymbol ]
        | null ->
            seq []
        | symbol ->
            seq [ symbol ]

    and createDependUponFromSymbol (symbol: ISymbol) =
        let rec createWhenIdentifiableAndInSource () =
            match isIdentifiableAndInSource with
            | true ->
                {
                    Identifier = formatIdentifier ()
                    Items = []
                }
                |> addAncestorHierarchyOfSymbol symbol
            | false ->
                None

        and isIdentifiableAndInSource =
            symbol |> isIdentifiable
            &&
            symbol |> hasLocationInSource

        and formatIdentifier () =
            match symbol with
            | :? IMethodSymbol as method ->
                method |> formatIdentifierFromMethodSymbol
            | _ ->
                symbol.MetadataName

        createWhenIdentifiableAndInSource()

    and addAncestorHierarchyOfSymbol symbol dependUpon =
        match symbol.ContainingSymbol with
        | null ->
            Some dependUpon
        | containingSymbol ->
            match referrer |> isSiblingOrHasAncestorSiblingOf symbol with
            | true ->
                Some dependUpon
            | false ->
                match containingSymbol |> isImplicitSymbol with
                | true ->
                    addAncestorHierarchyOfSymbol
                        containingSymbol
                        dependUpon
                | false ->
                    match containingSymbol |> isIdentifiable with
                    | true ->
                        addAncestorHierarchyOfSymbol
                            containingSymbol
                            {
                                Identifier = containingSymbol.MetadataName
                                Items = [ dependUpon ]
                            }
                    | false ->
                        None

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

let private isIdentifiable symbol =
    symbol.MetadataName <> ""