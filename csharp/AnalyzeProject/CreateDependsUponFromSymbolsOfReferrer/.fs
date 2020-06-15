module rec DevSnicket.Eunice._AnalyzeProject.CreateDependsUponFromSymbolsOfReferrer

open DevSnicket.Eunice._AnalyzeProject._createDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy
open DevSnicket.Eunice._AnalyzeProject.FormatIdentifierFromMethodSymbol
open Microsoft.CodeAnalysis

let createDependsUponFromSymbolsOfReferrer (referrer: ISymbol) =
     let rec createDependsUponFromSymbols symbols =
          symbols
          |> Seq.choose createDependUponWithAncestorHierachyFromSymbol
          |> groupDependsUponIntoHierarchy
          |> Seq.toList

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
                    dependUpon |> createAncestorHierarchy symbol
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

let private createAncestorHierarchy symbol item =
     match symbol.ContainingSymbol.Name with
     | "" ->
          {
               Identifier = symbol.ContainingAssembly.MetadataName
               Items = [ item ]
          }
     | _ ->
          createAncestorHierarchy
               symbol.ContainingSymbol
               {
                    Identifier = symbol.ContainingSymbol.MetadataName;
                    Items = [ item ]
               }