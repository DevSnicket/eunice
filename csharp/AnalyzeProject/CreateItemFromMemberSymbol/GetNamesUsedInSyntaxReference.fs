module rec DevSnicket.Eunice._AnalyzeProject._CreateItemFromMemberSymbol.GetNamesUsedInSyntaxReference

open Microsoft.CodeAnalysis
open Microsoft.CodeAnalysis.CSharp.Syntax

let getNamesUsedInSyntaxReference (syntaxReference: SyntaxReference) =
     syntaxReference.GetSyntax().DescendantNodes descendIntoChildren
     |> Seq.filter isName

let private descendIntoChildren syntaxNode =
     not <| syntaxNode :? QualifiedNameSyntax

let private isName syntaxNode =
     syntaxNode :? IdentifierNameSyntax
     ||
     syntaxNode :? QualifiedNameSyntax