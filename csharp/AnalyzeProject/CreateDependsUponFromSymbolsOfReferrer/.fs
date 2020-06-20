module rec DevSnicket.Eunice._AnalyzeProject.CreateDependsUponFromSymbolsOfReferrer

open DevSnicket.Eunice._AnalyzeProject._createDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy
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
                    seq [ ``type`` ]
          | symbol ->
               seq [ symbol ]

     and createDependUponWithAncestorHierachyFromSymbol (symbol: ISymbol) =
          let rec createWhenInSource () =
               match symbol |> hasLocationInSource with
               | true ->
                    Some (
                         withAncestorHierarchyWhenRequired
                              {
                                   Identifier = formatIdentifier ()
                                   Items = []
                              }
                    )
               | false ->
                    None

          and formatIdentifier () =
               match symbol with
               | :? IMethodSymbol as method ->
                    method |> formatIdentifierFromMethodSymbol
               | _ ->
                    symbol.MetadataName

          and withAncestorHierarchyWhenRequired dependUpon =
               match isAncestorHierarchyRequired () with
               | true ->
                    dependUpon |> addAncestorHierarchyOfSymbol  symbol
               | false ->
                    dependUpon
          
          and isAncestorHierarchyRequired () =
               symbol.ContainingSymbol <> referrer.ContainingSymbol
               &&
               symbol <> referrer.ContainingSymbol

          createWhenInSource()

     createDependsUponFromSymbols

let private hasLocationInSource =
     function
     | null ->
          false
     | symbol ->
          symbol.Locations
          |> Seq.exists (fun location -> location.IsInSource)

let private addAncestorHierarchyOfSymbol  symbol item =
     match symbol.ContainingSymbol with
     | null ->
          item
     | containingSymbol ->
          addAncestorHierarchyOfSymbol
               containingSymbol
               (item |> addParentOfContainingSymbol containingSymbol)

let private addParentOfContainingSymbol containingSymbol item =
     match containingSymbol |> isImplicitSymbol with
     | true ->
          item
     | false ->
          {
               Identifier = containingSymbol.MetadataName
               Items = [ item ]
          }

let private isImplicitSymbol =
     function
     | :? INamespaceSymbol as ``namespace`` ->
          ``namespace``.IsGlobalNamespace
     | :? IModuleSymbol ->
          true
     | _ ->
          false