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
               whenHasDependsUpon ()
               |> Option.orElseWith whenNotConstructor

     and whenHasDependsUpon () =
          match method |> createDependsUponFromMethod with
          | [] ->
               None
          | dependsUpon ->
               Some
                    {
                         DependsUpon = dependsUpon
                         Identifier = method.MetadataName
                         Items = []
                    }

     and whenNotConstructor () =
          match method.Name with
          | ".ctor" ->
               None
          | _ ->
               Some
                    {
                         DependsUpon = []
                         Identifier = method.MetadataName
                         Items = []
                    }

     createItemFromMethod ()