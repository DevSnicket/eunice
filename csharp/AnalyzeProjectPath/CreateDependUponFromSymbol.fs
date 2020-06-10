module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependUponFromSymbol

open DevSnicket.Eunice._AnalyzeProjectPath
open Microsoft.CodeAnalysis

let createDependUponFromSymbol (symbol: ISymbol) =
     match symbol |> hasLocationInSource with
     | true ->
          Some (
               createDependUponAncestors
                    symbol
                    {
                         Identifier = symbol.MetadataName
                         Items = []
                    }
          )
     | false ->
          None

let private hasLocationInSource =
     function
     | null ->
          false
     | symbol ->
          symbol.Locations
          |> Seq.exists (fun location -> location.IsInSource)

let private createDependUponAncestors symbol item =
     match symbol.ContainingSymbol.Name with
     | "" ->
          item
     | _ ->
          createDependUponAncestors
               symbol.ContainingSymbol
               {
                    Identifier = symbol.ContainingSymbol.MetadataName;
                    Items = [ item ]
               }