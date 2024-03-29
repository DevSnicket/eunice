// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.FormatIdentifierOfSymbol

open DevSnicket.Eunice._AnalyzeProject.GetIdentifierOfAssembly
open Microsoft.CodeAnalysis

type String = System.String

let formatIdentifierOfSymbol: (ISymbol -> String) =
    function
    | :? IAssemblySymbol as assembly ->
        assembly |> getIdentifierOfAssembly
    | symbol ->
        symbol.MetadataName
        +
        match symbol with
        | :? IMethodSymbol as method ->
            method |> formatIdentifierSuffixOfMethod
        | _ ->
            ""

let private formatIdentifierSuffixOfMethod (method: IMethodSymbol) =
    let rec formatIdentifierSuffixOfMethod () =
        match hasOverloads () with
        | true ->
            method.Parameters
            |> Seq.toList
            |> formatParameters
        | false ->
            ""

    and hasOverloads () =
        method.ContainingType.GetMembers()
        |> Seq.exists isOverload

    and isOverload =
        function
        | :? IMethodSymbol as siblingMethod ->
            siblingMethod <> method
            &&
            siblingMethod.MetadataName = method.MetadataName
        | _ ->
            false

    formatIdentifierSuffixOfMethod ()

let private formatParameters =
    function
    | [] ->
        ""
    | parameters ->
        "("
        +
        (parameters |> Seq.map formatTypeOfParameter |> String.concat ",")
        +
        ")"

let private formatTypeOfParameter parameter =
    parameter.Type |> formatType

let private formatType =
    function
    | :? IArrayTypeSymbol as array ->
        (array.ElementType |> formatType)
        +
        "[]"
    | symbol ->
        symbol |> getQualifiedName

let private getQualifiedName (symbol: ISymbol) =
    (symbol.ContainingSymbol |> getAsQualifier)
    +
    symbol.MetadataName

let private getAsQualifier symbol =
    match symbol.MetadataName with
    | "" ->
        symbol.ContainingAssembly.Name
    | _ ->
        symbol |> getQualifiedName
    +
    "."