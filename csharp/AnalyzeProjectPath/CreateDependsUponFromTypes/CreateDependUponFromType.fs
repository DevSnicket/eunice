module rec DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromTypes.CreateDependUponFromType

open DevSnicket.Eunice._AnalyzeProjectPath
open Microsoft.CodeAnalysis

let createDependUponFromType (``type``: ITypeSymbol) =
     match ``type``.SpecialType with
     | SpecialType.None ->
          Some (
               createDependUponAncestors
                    ``type``
                    {
                         Identifier = ``type``.MetadataName
                         Items = []
                    }
          )
     | _ ->
          None

let private createDependUponAncestors (symbol: ISymbol) item =
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
