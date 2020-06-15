module rec DevSnicket.Eunice._AnalyzeProject.CreateItemFromMemberSymbol

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject.CreateDependsUponFromSymbolsOfReferrer
open DevSnicket.Eunice._AnalyzeProject.FormatIdentifierFromMethodSymbol
open Microsoft.CodeAnalysis
open Microsoft.CodeAnalysis.CSharp.Syntax

let createItemFromMemberSymbol (getSymbolFromSyntaxNode: SyntaxNode -> ISymbol) =
     let rec createItemFromMemberSymbol (``member``: ISymbol) =
          let rec createItemFromMemberSymbol () =
               match ``member`` with
               | :? IEventSymbol as event ->
                    createItemWithType (Some event.Type)
               | :? IFieldSymbol as field ->
                    field |> createItemFromField
               | :? IMethodSymbol as method ->
                    method |> createItemFromMethod
               | :? IPropertySymbol as property ->
                    createItemWithType (Some property.Type)
               | _ ->
                    createItemWithType None

          and createItemFromField field =
               match field.AssociatedSymbol with
               | :? IPropertySymbol ->
                    None
               | _ ->
                    createItemWithType (Some field.Type)

          and createItemWithType ``type`` =
               createItemFromIdentifierAndMemberAndType ``member``.MetadataName ``member`` ``type``

          createItemFromMemberSymbol()

     and createItemFromMethod method =
          let rec createItemFromMethod () =
               match isRelevant with
               | true ->
                    match method.PartialImplementationPart with
                    | null ->
                         createItemFromImplementationMethod method
                    | partialImplementationPart ->
                         createItemFromImplementationMethod partialImplementationPart
               | false ->
                    None

          and isRelevant =
               not <| method.IsImplicitlyDeclared
               &&
               method.AssociatedSymbol |> (not << isEventOrProperty)

          createItemFromMethod ()

     and createItemFromImplementationMethod method =
          createItemFromIdentifierAndMemberAndType
               (method |> formatIdentifierFromMethodSymbol)
               method
               None

     and createItemFromIdentifierAndMemberAndType identifier ``member`` ``type`` =
          let rec createItemFromMemberAndMetadataAndType () =
               Some
                    {
                         DependsUpon =
                              seq [
                                   yield! ``type`` |> Option.toList |> Seq.cast
                                   yield! getDeclaringSymbols ()
                              ]
                              |> createDependsUponFromSymbolsOfReferrer ``member``
                         Identifier =
                              identifier
                         Items =
                              []
                    }

          and getDeclaringSymbols () =
               ``member``.DeclaringSyntaxReferences
               |> Seq.collect getNamesUsedInSyntaxReference
               |> Seq.map getSymbolFromSyntaxNode

          createItemFromMemberAndMetadataAndType()

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