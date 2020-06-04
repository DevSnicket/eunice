module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromNamedType

open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependUponFromType
open DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromNamedType.GroupDependsUponIntoHierarchy
open Microsoft.CodeAnalysis

let createDependsUponFromNamedType (``type``: INamedTypeSymbol) =
     let rec createDependsUponFromNamedType () =
          seq [
               yield! getTypesWithTypeArguments ()
               yield! getTypeParameters ()
          ]
          |> createDependsUponFromTypes

     and getTypesWithTypeArguments () =
          seq [
               yield! ``type``.BaseType |> Option.ofObj |> Option.toList
               yield! ``type``.Interfaces
          ]
          |> Seq.collect getTypeWithTypeArguments

     and getTypeParameters () =
          ``type``.TypeParameters
          |> Seq.collect (fun typeParameter -> typeParameter.ConstraintTypes)

     createDependsUponFromNamedType ()

let private getTypeWithTypeArguments ``type`` =
     seq [
          ``type`` :> ITypeSymbol
          yield! ``type``.TypeArguments
     ]

let private createDependsUponFromTypes =
     Seq.choose createDependUponFromType
     >> groupDependsUponIntoHierarchy
     >> Seq.toList