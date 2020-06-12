module rec DevSnicket.Eunice.AnalyzeProjectPath

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbols
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypeDeclaration
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenEnum
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemFromMemberSymbol
open DevSnicket.Eunice._AnalyzeProjectPath.FormatItemsAsYaml
open Microsoft.CodeAnalysis

let analyzeProjectPath projectPath =
     async {
          use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

          let getCompilation () =
               async {
                    let! project =
                         projectPath
                         |> workspace.OpenProjectAsync
                         |> Async.AwaitTask

                    return!
                         project.GetCompilationAsync ()
                         |> Async.AwaitTask
               }

          let! compilation = getCompilation ()

          return
               compilation
               |> createItemsInCompilation
               |> formatItemsAsYaml
     }

let private createItemsInCompilation compilation =
     let rec createItemsInCompilation () =
          compilation.GlobalNamespace
          |> createItemsFromMembersOfNamespace

     and createItemsFromMembersOfNamespace ``namespace`` =
          ``namespace``.GetMembers ()
          |> Seq.choose createItemWhenNamespaceOrType
          |> Seq.sortBy (fun item -> item.Identifier)

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

let private createItemWhenDelegate ``type`` =
     ``type``.DelegateInvokeMethod
     |> Option.ofObj
     |> Option.map createItemFromDelegateInvokeMethod

let private createItemFromDelegateInvokeMethod method =
     {
          DependsUpon =
               seq [
                    yield! method.Parameters |> Seq.map (fun parameter -> parameter.Type)
                    method.ReturnType
               ]
               |> createDependsUponFromSymbols
          Identifier =
               method.ContainingType.MetadataName
          Items =
               []
     }

let private createItemFromClassOrInterfaceOrStruct getSymbolFromSyntaxNode ``type`` =
     {
          DependsUpon =
               ``type`` |> createDependsUponFromTypeDeclaration
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