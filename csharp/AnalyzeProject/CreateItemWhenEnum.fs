module rec DevSnicket.Eunice._AnalyzeProject.CreateItemWhenEnum

open DevSnicket.Eunice._AnalyzeProject
open Microsoft.CodeAnalysis

let createItemWhenEnum (``type``: INamedTypeSymbol) =
    match ``type``.EnumUnderlyingType with
    | null -> None
    | _ -> Some (``type`` |> createItemFromEnum)

let private createItemFromEnum enum =
    {
        DependsUpon = []
        Identifier = enum.Name
        Items = []
    }
