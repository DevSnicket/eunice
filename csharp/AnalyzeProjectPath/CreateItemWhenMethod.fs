module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenMethod

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes
open DevSnicket.Eunice._AnalyzeProjectPath.GetTypesUsedInMethodDeclaration
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
                              seq [
                                   yield! method |> getTypesUsedInMethodDeclaration
                                   yield! getTypesUsedInBody ()
                              ]
                              |> createDependsUponFromTypes
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

     and getTypesUsedInBody () =
          method.DeclaringSyntaxReferences
          |> Seq.collect getTypesUsedInSyntaxReference
          |> Seq.map getSymbolInfo
          |> Seq.cast

     createItemFromMethod ()

let private isEventOrProperty symbol =
     symbol :? IEventSymbol
     ||
     symbol :? IPropertySymbol

let private getTypesUsedInSyntaxReference syntaxReference =
     match syntaxReference.GetSyntax () with
     | :? MethodDeclarationSyntax as method ->
          method |> getTypesUsedInBody
     | _ ->
          seq []

let private getTypesUsedInBody method =
     match method.Body with
     | null ->
          seq []
     | body ->
          body.Statements
          |> Seq.choose getTypeSyntaxUsedInStatement

let private getTypeSyntaxUsedInStatement =
     function
     | :? LocalDeclarationStatementSyntax as localDeclaration ->
          Some localDeclaration.Declaration.Type
     | _ ->
          None