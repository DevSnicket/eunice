module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemFromMemberSymbol

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbolsOfReferrer
open Microsoft.CodeAnalysis
open Microsoft.CodeAnalysis.CSharp.Syntax

let createItemFromMemberSymbol (getSymbolFromSyntaxNode: SyntaxNode -> ISymbol) =
     let rec createItemFromMemberSymbol: (ISymbol -> Item option) =
          function
          | :? IEventSymbol as event ->
               Some
                    event.Type
                    |> createItemWithTypeFromMemberImplementation event
          | :? IFieldSymbol as field ->
               field |> createItemFromField
          | :? IMethodSymbol as method ->
               method |> createItemFromMethod
          | :? IPropertySymbol as property ->
               Some
                    property.Type
                    |> createItemWithTypeFromMemberImplementation property
          | ``member`` ->
               createItemFromMemberImplementation ``member``

     and createItemFromField field =
          match field.AssociatedSymbol with
          | :? IPropertySymbol ->
               None
          | _ ->
               Some
                    field.Type
                    |> createItemWithTypeFromMemberImplementation field

     and createItemFromMethod method =
          let rec createItemFromMethod () =
               match isRelevant with
               | true ->
                    match method.PartialImplementationPart with
                    | null ->
                         createItemFromMemberImplementation method
                    | partialImplementationPart ->
                         createItemFromMemberImplementation partialImplementationPart
               | false ->
                    None

          and isRelevant =
               not <| method.IsImplicitlyDeclared
               &&
               method.AssociatedSymbol |> (not << isEventOrProperty)

          createItemFromMethod ()

     and createItemFromMemberImplementation ``member`` =
          None |> createItemWithTypeFromMemberImplementation ``member``

     and createItemWithTypeFromMemberImplementation (``member``: ISymbol) =
          let rec createItemWithType ``type`` =
               Some
                    {
                         DependsUpon =
                              seq [
                                   yield! ``type`` |> Option.toList |> Seq.cast
                                   yield! getDeclaringSymbols ()
                              ]
                              |> createDependsUponFromSymbolsOfReferrer ``member``
                         Identifier =
                              ``member``.MetadataName
                         Items =
                              []
                    }

          and getDeclaringSymbols () =
               ``member``.DeclaringSyntaxReferences
               |> Seq.collect getNamesUsedInSyntaxReference
               |> Seq.map getSymbolFromSyntaxNode

          createItemWithType

     createItemFromMemberSymbol

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