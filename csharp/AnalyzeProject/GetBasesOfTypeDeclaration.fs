module rec DevSnicket.Eunice._AnalyzeProject.GetBasesOfTypeDeclaration

open Microsoft.CodeAnalysis

let getBasesOfTypeDeclaration (``type``: INamedTypeSymbol) =
     let rec createDependsUponFromTypeDeclaration () =
          seq [
               yield! getTypesWithTypeArguments ()
               yield! getTypeParameters ()
          ]

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
     match ``type``.IsGenericType with
     | true ->
          seq [
               ``type``.ConstructedFrom
               yield! ``type``.TypeArguments
          ]
     | false ->
          seq [ ``type`` ]