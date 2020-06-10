module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenMethod

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbols
open Microsoft.CodeAnalysis
open Microsoft.CodeAnalysis.CSharp.Syntax

let createItemWhenMethod (getSymbolInfo: SyntaxNode -> ISymbol): (ISymbol -> Item option) =
     function
     | :? IMethodSymbol as method ->
          method |> createItemFromMethod getSymbolInfo
     | _ ->
          None

let private createItemFromMethod getSymbolInfo method =
     let rec createItemFromMethod () =
          match isRelevant with
          | true ->
               Some
                    {
                         DependsUpon =
                              createDependsUpon ()
                         Identifier =
                              method.MetadataName
                         Items =
                              []
                    }
          | false ->
               None

     and isRelevant =
          not <| method.IsImplicitlyDeclared
          &&
          method.AssociatedSymbol |> (not << isEventOrProperty)

     and createDependsUpon () =
          method.DeclaringSyntaxReferences
          |> Seq.collect getNamesUsedInSyntaxReference
          |> Seq.map getSymbolInfo
          |> createDependsUponFromSymbols

     createItemFromMethod ()

let private isEventOrProperty symbol =
     symbol :? IEventSymbol
     ||
     symbol :? IPropertySymbol

let private getNamesUsedInSyntaxReference syntaxReference =
     syntaxReference.GetSyntax().DescendantNodes (isName >> not)
     |> Seq.filter isName

let private isName syntaxNode =
     syntaxNode :? IdentifierNameSyntax
     ||
     syntaxNode :? QualifiedNameSyntax