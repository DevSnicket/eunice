module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypeDeclaration

open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes
open Microsoft.CodeAnalysis

let createDependsUponFromTypeDeclaration (``type``: INamedTypeSymbol) =
     let rec createDependsUponFromTypeDeclaration () =
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

     createDependsUponFromTypeDeclaration ()

let private getTypeWithTypeArguments ``type`` =
     seq [
          ``type`` :> ITypeSymbol
          yield! ``type``.TypeArguments
     ]