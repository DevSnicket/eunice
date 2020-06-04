module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes

open DevSnicket.Eunice._AnalyzeProjectPath
open Microsoft.CodeAnalysis

let createDependsUponFromTypes (types: INamedTypeSymbol seq) =
     types
     |> Seq.choose createDependUponFromType
     |> Seq.sortBy (fun dependUpon -> dependUpon.Identifier)
     |> Seq.toList

let createDependUponFromType ``type`` =
     match ``type``.SpecialType with
     | SpecialType.None ->
          Some (
               createDependUponAncestors
                    ``type``
                    {
                         Identifier = ``type``.Name
                         Items = []
                    }
          )
     | _ ->
          None

let createDependUponAncestors (symbol: ISymbol) item =
     match symbol.ContainingSymbol.Name with
     | "" ->
          item
     | _ ->
          createDependUponAncestors
               symbol.ContainingSymbol
               {
                    Identifier = symbol.ContainingSymbol.Name;
                    Items = [ item ]
               }