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
        (parameters |> Seq.map formatParameterType |> String.concat ",")
        +
        ")"

let private formatParameterType parameter =
    parameter.Type |> getQualifiedName

let private getQualifiedName (symbol: ISymbol) =
    (symbol.ContainingSymbol |> getQualifier)
    +
    "."
    +
    symbol.MetadataName

let private getQualifier (symbol: ISymbol) =
    match symbol.Name with
    | "" ->
        symbol.ContainingAssembly.Name
    | _ ->
        symbol |> getQualifiedName