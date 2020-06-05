module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenField

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependUponFromType
open Microsoft.CodeAnalysis

let createItemWhenField: (ISymbol -> Item option) =
     function
     | :? IFieldSymbol as field ->
          Some (field |> createItemFromField)
     | _ ->
          None

let private createItemFromField field =
     {
          DependsUpon =
               field.Type
               |> createDependUponFromType
               |> Option.toList
          Identifier =
               field.Name
          Items =
               []
     }