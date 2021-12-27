// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetBasesOfTypeDeclaration

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
        |> Seq.map (fun typeBase -> typeBase :> ITypeSymbol)

    and getTypeParameters () =
        ``type``.TypeParameters
        |> Seq.collect (fun typeParameter -> typeParameter.ConstraintTypes)

    createDependsUponFromTypeDeclaration ()