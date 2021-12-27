// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType._GetSymbolsReferencedByMember.GetNamesUsedInSyntaxReference

open Microsoft.CodeAnalysis
open Microsoft.CodeAnalysis.CSharp.Syntax

let getNamesUsedInSyntaxReference (syntaxReference: SyntaxReference) =
    syntaxReference.GetSyntax().DescendantNodes (not << areChildrenIgnored)
    |> Seq.filter isName

let private areChildrenIgnored syntaxNode =
    syntaxNode :? AliasQualifiedNameSyntax
    ||
    syntaxNode :? MemberAccessExpressionSyntax
    ||
    syntaxNode :? QualifiedNameSyntax

let private isName syntaxNode =
    syntaxNode :? AliasQualifiedNameSyntax
    ||
    syntaxNode :? IdentifierNameSyntax
    ||
    syntaxNode :? MemberAccessExpressionSyntax
    ||
    syntaxNode :? QualifiedNameSyntax