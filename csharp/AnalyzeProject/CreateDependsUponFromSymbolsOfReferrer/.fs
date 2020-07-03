module rec DevSnicket.Eunice._AnalyzeProject.CreateDependsUponFromSymbolsOfReferrer

open DevSnicket.Eunice._AnalyzeProject._CreateDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy
open DevSnicket.Eunice._AnalyzeProject.FormatIdentifierFromMethodSymbol
open Microsoft.CodeAnalysis

let createDependsUponFromSymbolsOfReferrer (referrer: ISymbol) =
    let rec createDependsUponFromSymbols (symbols: ISymbol seq) =
        symbols
        |> Seq.collect ignoreLocalAndGetWithTypesOfGenerics
        |> Seq.choose createDependUponWithAncestorHierachyFromSymbol
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

    and createDependUponWithAncestorHierachyFromSymbol (symbol: ISymbol) =
        let rec createWhenIdentifiableAndInSource () =
            match isIdentifiableAndInSource with
            | true ->
                withAncestorHierarchyWhenRequired
                    {
                        Identifier = formatIdentifier ()
                        Items = []
                    }
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

        and withAncestorHierarchyWhenRequired dependUpon =
            match isAncestorHierarchyRequired () with
            | true ->
                dependUpon |> addAncestorHierarchyOfSymbol symbol
            | false ->
                Some dependUpon
        
        and isAncestorHierarchyRequired () =
            symbol.ContainingSymbol <> referrer.ContainingSymbol
            &&
            symbol <> referrer.ContainingSymbol

        createWhenIdentifiableAndInSource()

    createDependsUponFromSymbols

let private hasLocationInSource symbol =
    symbol.Locations
    |> Seq.exists (fun location -> location.IsInSource)

let private addAncestorHierarchyOfSymbol symbol item =
    match symbol.ContainingSymbol with
    | null ->
        Some item
    | containingSymbol ->
        match containingSymbol |> isImplicitSymbol with
        | true ->
            addAncestorHierarchyOfSymbol
                containingSymbol
                item
        | false ->
            match containingSymbol |> isIdentifiable with
            | true ->
                addAncestorHierarchyOfSymbol
                    containingSymbol
                    {
                        Identifier = containingSymbol.MetadataName
                        Items = [ item ]
                    }
            | false ->
                None

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