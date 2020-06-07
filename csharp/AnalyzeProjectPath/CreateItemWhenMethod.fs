module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenMethod

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromMethod
open Microsoft.CodeAnalysis

let createItemWhenMethod: (ISymbol -> Item option)=
     function
     | :? IMethodSymbol as method ->
          method |> createItemFromMethod
     | _ ->
          None

let private createItemFromMethod method =
     let rec createItemFromMethod () =
          match method.AssociatedSymbol with
          | :? IEventSymbol
          | :? IPropertySymbol ->
               None
          | _ ->
               match method.IsImplicitlyDeclared with
               | true ->
                    None
               | false ->
                    Some
                         {
                              DependsUpon =
                                   method |> createDependsUponFromMethod
                              Identifier =
                                   method.MetadataName
                              Items =
                                   []
                         }

     createItemFromMethod ()