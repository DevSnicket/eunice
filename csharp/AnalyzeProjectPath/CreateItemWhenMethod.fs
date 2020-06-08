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
          seq [
               yield! method.ExpressionBody |> getTypesUsedInExpressionBody
               yield! method.Body |> getTypesUsedInBody
          ]
     | _ ->
          seq []

let private getTypesUsedInBody =
     function
     | null ->
          seq []
     | body ->
          body.Statements
          |> Seq.choose getTypeUsedInStatement

let private getTypesUsedInExpressionBody =
     function
     | null ->
          []
     | expressionBody ->
          expressionBody.Expression
          |> getTypeUsedInExpression
          |> Option.toList

let private getTypeUsedInStatement =
     function
     | :? ExpressionStatementSyntax as expressionStatement ->
          expressionStatement.Expression |> getTypeUsedInExpression
     | :? LocalDeclarationStatementSyntax as localDeclaration ->
          Some localDeclaration.Declaration.Type
     | _ ->
          None

let private getTypeUsedInExpression =
     function
     | :? CastExpressionSyntax as cast ->
          Some cast.Type
     | _ ->
          None