module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenEventOrField

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependUponFromType
open Microsoft.CodeAnalysis

let createItemWhenEventOrField: (ISymbol -> Item option) =
     function
     | :? IEventSymbol as event ->
          Some (event |> createItemFromEventOrFieldOrPropertyWithType event.Type)
     | :? IFieldSymbol as field ->
          field |> createItemFromFieldWhenNotProperty
     | :? IPropertySymbol as property ->
          Some (property |> createItemFromEventOrFieldOrPropertyWithType property.Type)
     | _ ->
          None

let private createItemFromFieldWhenNotProperty field =
     match field.AssociatedSymbol with
     | :? IPropertySymbol ->
          None
     | _ ->
          Some (field |> createItemFromEventOrFieldOrPropertyWithType field.Type)

let private createItemFromEventOrFieldOrPropertyWithType ``type`` (eventOrField: ISymbol) =
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