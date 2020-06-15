module rec DevSnicket.Eunice._AnalyzeProject.FormatIdentifierFromMethodSymbol

open Microsoft.CodeAnalysis

let formatIdentifierFromMethodSymbol (method: IMethodSymbol) =
    let rec formatIdentifierFromMethodSymbol () =
        method.MetadataName
        +
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

    formatIdentifierFromMethodSymbol ()

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