module rec DevSnicket.Eunice._AnalyzeProject._CreateItemFromMemberSymbol.GetNamesUsedInSyntaxReference

open Microsoft.CodeAnalysis
open Microsoft.CodeAnalysis.CSharp.Syntax

let getNamesUsedInSyntaxReference (syntaxReference: SyntaxReference) =
    syntaxReference.GetSyntax().DescendantNodes (not << areChildrenIgnored)
    |> Seq.filter isName

let private areChildrenIgnored syntaxNode =
    syntaxNode :? AliasQualifiedNameSyntax
    ||
    syntaxNode :? QualifiedNameSyntax

let private isName syntaxNode =
    syntaxNode :? AliasQualifiedNameSyntax
    ||
    syntaxNode :? IdentifierNameSyntax
    ||
    syntaxNode :? QualifiedNameSyntax