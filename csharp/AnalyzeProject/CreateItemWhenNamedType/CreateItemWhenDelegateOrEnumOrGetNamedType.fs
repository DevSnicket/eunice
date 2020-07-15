module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateItemWhenDelegateOrEnumOrGetNamedType

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.CreateDependsUponFromSymbolsOfReferrer
open Microsoft.CodeAnalysis

type ItemOfDelegateOrEnumOrOtherNamedType =
    | ItemOfDelegateOrEnum of Item
    | NamedTypeNotOfDelegateOrEnum of INamedTypeSymbol

let createItemWhenDelegateOrEnumOrGetNamedType: (ISymbol -> ItemOfDelegateOrEnumOrOtherNamedType option) =
    function
    | :? INamedTypeSymbol as namedType ->
        Some (
            namedType
            |> createItemWhenDelegateOrEnum
            |> Option.map ItemOfDelegateOrEnum
            |> Option.defaultValue (namedType |> NamedTypeNotOfDelegateOrEnum)
        )
    | _ ->
        None

let private createItemWhenDelegateOrEnum namedType =
    let rec createItemWhenDelegateOrEnum () =
        whenDelegate
        |> Option.orElseWith whenEnum

    and whenDelegate =
        let rec whenDelegate() =
            namedType.DelegateInvokeMethod
            |> Option.ofObj
            |> Option.map fromDelegateInvokeMethod

        and fromDelegateInvokeMethod method =
            {
                DependsUpon =
                    seq [
                        yield! method.Parameters |> Seq.map (fun parameter -> parameter.Type :> ISymbol)
                        method.ReturnType
                    ]
                    |> createDependsUponFromSymbolsOfReferrer namedType
                Identifier =
                    method.ContainingType.MetadataName
                Items =
                    []
            }

        whenDelegate ()

    and whenEnum () =
        match namedType.EnumUnderlyingType with
        | null ->
            None
        | _ ->
            Some {
                DependsUpon = []
                Identifier = namedType.Name
                Items = []
            }

    createItemWhenDelegateOrEnum ()