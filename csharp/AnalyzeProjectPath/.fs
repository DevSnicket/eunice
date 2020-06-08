module rec DevSnicket.Eunice.AnalyzeProjectPath

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypeDeclaration
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenEnum
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenEventOrField
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenMethod
open DevSnicket.Eunice._AnalyzeProjectPath.GetTypesUsedInMethodDeclaration
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
                    ``type`` |> createItemWhenType getSymbolInfo
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
     
     and getSymbolInfo (syntaxNode: SyntaxNode) =
          syntaxNode.SyntaxTree
          |> compilation.GetSemanticModel
          |> (fun semanticModel -> syntaxNode |> semanticModel.GetSymbolInfo)
          |> (fun symbolInfo -> symbolInfo.Symbol)

     createItemsInCompilation ()

let private createItemWhenType getSymbolInfo: (ISymbol -> Item option) =
     function
     | :? INamedTypeSymbol as ``type`` ->
          Some (``type`` |> createItemFromType getSymbolInfo)
     | _ ->
          None

let private createItemFromType getSymbolInfo ``type`` =
     ``type`` |> createItemWhenDelegate
     |> Option.orElseWith (fun _ -> ``type`` |> createItemWhenEnum)
     |> Option.defaultWith (fun _ -> ``type`` |> createItemFromClassOrInterfaceOrStruct getSymbolInfo)

let private createItemWhenDelegate ``type`` =
     ``type``.DelegateInvokeMethod
     |> Option.ofObj
     |> Option.map createItemFromDelegateInvokeMethod

let private createItemFromDelegateInvokeMethod method =
     {
          DependsUpon =
               method
               |> getTypesUsedInMethodDeclaration
               |> createDependsUponFromTypes
          Identifier =
               method.ContainingType.MetadataName
          Items =
               []
     }

let private createItemFromClassOrInterfaceOrStruct getSymbolInfo ``type`` =
     {
          DependsUpon =
               ``type`` |> createDependsUponFromTypeDeclaration
          Identifier =
               ``type``.MetadataName
          Items =
               ``type``.GetMembers ()
               |> Seq.choose (createItemFromMember getSymbolInfo)
               |> Seq.toList
     }

let private createItemFromMember getSymbolInfo ``member`` =
     ``member`` |> createItemWhenEventOrField
     |> Option.orElseWith (fun _ -> ``member`` |> createItemWhenMethod getSymbolInfo)
     |> Option.orElseWith (fun _ -> ``member`` |> createItemWhenType getSymbolInfo)