module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemFromMember

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbols
open Microsoft.CodeAnalysis
open Microsoft.CodeAnalysis.CSharp.Syntax

let createItemFromMember (getSymbolFromSyntaxNode: SyntaxNode -> ISymbol) (``member``: ISymbol) =
     let rec createItemFromMember () =
          match ``member`` with
          | :? IEventSymbol as event ->
               Some event.Type |> createItemWithType
          | :? IFieldSymbol as field ->
               field |> createItemFromField
          | :? IMethodSymbol as method ->
               method |> createItemFromMethod
          | :? IPropertySymbol as property ->
               Some property.Type |> createItemWithType
          | _ ->
               None |> createItemWithType

     and createItemFromField field =
          match field.AssociatedSymbol with
          | :? IPropertySymbol ->
               None
          | _ ->
               Some field.Type |> createItemWithType

     and createItemFromMethod method =
          let rec createItemFromMethod () =
               match isRelevant with
               | true ->
                    createItemWithType None
               | false ->
                    None

          and isRelevant =
               not <| method.IsImplicitlyDeclared
               &&
               method.AssociatedSymbol |> (not << isEventOrProperty)

          createItemFromMethod ()

     and createItemWithType (``type``: ITypeSymbol option) =
          Some
               {
                    DependsUpon =
                         seq [
                              yield! ``type`` |> Option.toList |> Seq.cast
                              yield! getDeclaringSymbols ()
                         ]
                         |> createDependsUponFromSymbols
                    Identifier =
                         ``member``.MetadataName
                    Items =
                         []
               }

     and getDeclaringSymbols () =
          ``member``.DeclaringSyntaxReferences
          |> Seq.collect getNamesUsedInSyntaxReference
          |> Seq.map getSymbolFromSyntaxNode

     createItemFromMember ()

let private isEventOrProperty symbol =
     symbol :? IEventSymbol
     ||
     symbol :? IPropertySymbol

let private getNamesUsedInSyntaxReference syntaxReference =
     syntaxReference.GetSyntax().DescendantNodes (not << isName)
     |> Seq.filter isName

let private isName syntaxNode =
     syntaxNode :? IdentifierNameSyntax
     ||
     syntaxNode :? QualifiedNameSyntax