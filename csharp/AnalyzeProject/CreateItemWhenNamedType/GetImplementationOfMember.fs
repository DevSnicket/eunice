module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetImplementationOfMember

open Microsoft.CodeAnalysis

let getImplementationOfMember (``member``: ISymbol) =
    match ``member`` with
    | :? IFieldSymbol as field ->
        match field.AssociatedSymbol with
        | :? IPropertySymbol ->
            None
        | _ ->
            Some ``member``
    | :? IMethodSymbol as method ->
        method |> getImplementationOfMethod
    | _ ->
        Some ``member``

let private getImplementationOfMethod method =
    let rec getImplementationOfMethod () =
        match isRelevant with
        | true ->
            match method.PartialImplementationPart with
            | null ->
                Some (method :> ISymbol)
            | partialImplementationPart ->
                Some (partialImplementationPart :> ISymbol)
        | false ->
            None

    and isRelevant =
        not <| method.IsImplicitlyDeclared
        &&
        method.AssociatedSymbol |> (not << isEventOrProperty)

    getImplementationOfMethod ()

let private isEventOrProperty symbol =
    symbol :? IEventSymbol
    ||
    symbol :? IPropertySymbol