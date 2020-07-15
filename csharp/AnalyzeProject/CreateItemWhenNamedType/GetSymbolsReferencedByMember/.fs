module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.GetSymbolsReferencedByMember

open DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType._GetSymbolsReferencedByMember.GetNamesUsedInSyntaxReference
open Microsoft.CodeAnalysis

let getSymbolsReferencedByMember (getSymbolFromSyntaxNode: SyntaxNode -> ISymbol) ``member`` =
    let rec getTypesReferenced () =
        seq [
            yield! ``member`` |> getTypesWithoutDeclaringSyntaxFromMember
            yield! typesDeclaredInSyntax
        ]

    and typesDeclaredInSyntax =
        ``member``.DeclaringSyntaxReferences
        |> Seq.collect getNamesUsedInSyntaxReference
        |> Seq.map getSymbolFromSyntaxNode

    getTypesReferenced ()

let private getTypesWithoutDeclaringSyntaxFromMember: (ISymbol -> ISymbol seq) =
    function
    | :? IEventSymbol as event ->
        seq [ event.Type ]
    | :? IFieldSymbol as field ->
        seq [ field.Type ]
    | _ ->
        seq []