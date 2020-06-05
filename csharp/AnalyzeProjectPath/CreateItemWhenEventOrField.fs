module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenEventOrField

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependUponFromType
open Microsoft.CodeAnalysis

let createItemWhenEventOrField: (ISymbol -> Item option) =
     function
     | :? IEventSymbol as event ->
          Some (event |> createItemFromEventOrFieldWithType event.Type)
     | :? IFieldSymbol as field ->
          Some (field |> createItemFromEventOrFieldWithType field.Type)
     | _ ->
          None

let private createItemFromEventOrFieldWithType ``type`` (eventOrField: ISymbol) =
     {
          DependsUpon =
               ``type``
               |> createDependUponFromType
               |> Option.toList
          Identifier =
               eventOrField.Name
          Items =
               []
     }