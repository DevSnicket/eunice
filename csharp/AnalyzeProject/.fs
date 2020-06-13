module rec DevSnicket.Eunice.AnalyzeProject

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject.CreateDependsUponFromSymbolsOfReferrer
open DevSnicket.Eunice._AnalyzeProject.GetBasesOfTypeDeclaration
open DevSnicket.Eunice._AnalyzeProject.CreateItemWhenDelegate
open DevSnicket.Eunice._AnalyzeProject.CreateItemWhenEnum
open DevSnicket.Eunice._AnalyzeProject.CreateItemFromMemberSymbol
open DevSnicket.Eunice._AnalyzeProject.FormatItemsAsYaml
open Microsoft.CodeAnalysis

let analyzeProject (project: Project) =
     async {
          let! compilation =
               project.GetCompilationAsync ()
               |> Async.AwaitTask

          return
               compilation
               |> createItemsInCompilation
               |> formatItemsAsYaml
     }

let private createItemsInCompilation compilation =
     let rec createItemsInCompilation () =
          seq [ {
               DependsUpon =
                    []
               Identifier =
                    compilation.AssemblyName
               Items =
                    compilation.GlobalNamespace
                    |> createItemsFromMembersOfNamespace
          } ]

     and createItemsFromMembersOfNamespace ``namespace`` =
          ``namespace``.GetMembers ()
          |> Seq.choose createItemWhenNamespaceOrType
          |> Seq.sortBy (fun item -> item.Identifier)
          |> Seq.toList

     and createItemWhenNamespaceOrType =
          function
          | :? INamespaceSymbol as ``namespace`` ->
               ``namespace`` |> createItemFromNamespace
          | ``type`` ->
               match ``type``.ContainingAssembly = compilation.Assembly with
               | true ->
                    ``type`` |> createItemWhenType getSymbolFromSyntaxNode
               | false ->
                    None

     and createItemFromNamespace ``namespace`` =
          ``namespace``
          |> createItemsFromMembersOfNamespace
          |> Seq.toList
          |> function
               | [] ->
                    None
               | items ->
                    Some
                         {
                              DependsUpon = []
                              Identifier = ``namespace``.Name
                              Items = items
                         }
     
     and getSymbolFromSyntaxNode (syntaxNode: SyntaxNode) =
          syntaxNode.SyntaxTree
          |> compilation.GetSemanticModel
          |> (fun semanticModel -> syntaxNode |> semanticModel.GetSymbolInfo)
          |> (fun symbolInfo -> symbolInfo.Symbol)

     createItemsInCompilation ()

let private createItemWhenType getSymbolFromSyntaxNode: (ISymbol -> Item option) =
     function
     | :? INamedTypeSymbol as ``type`` ->
          Some (``type`` |> createItemFromType getSymbolFromSyntaxNode)
     | _ ->
          None

let private createItemFromType getSymbolFromSyntaxNode ``type`` =
     ``type`` |> createItemWhenDelegate
     |> Option.orElseWith (fun _ -> ``type`` |> createItemWhenEnum)
     |> Option.defaultWith (fun _ -> ``type`` |> createItemFromClassOrInterfaceOrStruct getSymbolFromSyntaxNode)

let private createItemFromClassOrInterfaceOrStruct getSymbolFromSyntaxNode ``type`` =
     {
          DependsUpon =
               ``type``
               |> getBasesOfTypeDeclaration
               |> createDependsUponFromSymbolsOfReferrer ``type``
          Identifier =
               ``type``.MetadataName
          Items =
               ``type``.GetMembers ()
               |> Seq.choose (createItemFromMemberOrNestedType getSymbolFromSyntaxNode)
               |> Seq.toList
     }

let private createItemFromMemberOrNestedType getSymbolFromSyntaxNode memberOrNestedType =
     memberOrNestedType |> createItemWhenType getSymbolFromSyntaxNode
     |> Option.orElseWith (fun _ -> memberOrNestedType |> createItemFromMemberSymbol getSymbolFromSyntaxNode)