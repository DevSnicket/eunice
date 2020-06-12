module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbolsOfReferrer

open DevSnicket.Eunice._AnalyzeProjectPath._createDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy
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
                         withAncestorHierarchyWhenNotSibling
                              {
                                   Identifier = symbol.MetadataName
                                   Items = []
                              }
                    )
               | false ->
                    None

          and withAncestorHierarchyWhenNotSibling dependUpon =
               match symbol.ContainingSymbol = referrer.ContainingSymbol with
               | true ->
                    dependUpon
               | false ->
                    dependUpon |> createAncestorHierarchy symbol

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
          item
     | _ ->
          createAncestorHierarchy
               symbol.ContainingSymbol
               {
                    Identifier = symbol.ContainingSymbol.MetadataName;
                    Items = [ item ]
               }