module rec DevSnicket.Eunice.AnalyzeProjectPath

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromMethod
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypeDeclaration
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenEnum
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenEventOrField
open DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenMethod
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
               compilation.GlobalNamespace
               |> createItemsFromMembersOfNamespace
               |> formatItemsAsYaml
     }

let private createItemsFromMembersOfNamespace ``namespace`` =
     ``namespace``.GetMembers ()
     |> Seq.choose createItemWhenNamespaceOrType
     |> Seq.sortBy (fun item -> item.Identifier)

let private createItemWhenNamespaceOrType =
     function
     | :? INamespaceSymbol as ``namespace`` ->
          Some (``namespace`` |> createItemFromNamespace)
     | ``type`` ->
          ``type`` |> createItemWhenType

let private createItemFromNamespace ``namespace`` =
     {
          DependsUpon =
               []
          Identifier =
               ``namespace``.Name
          Items =
               ``namespace``
               |> createItemsFromMembersOfNamespace
               |> Seq.toList
     }

let private createItemWhenType: (ISymbol -> Item option) =
     function
     | :? INamedTypeSymbol as ``type`` ->
          Some (``type`` |> createItemFromType)
     | _ ->
          None

let private createItemFromType ``type`` =
     ``type`` |> createItemWhenDelegate
     |> Option.orElseWith (fun _ -> ``type`` |> createItemWhenEnum)
     |> Option.defaultWith (fun _ -> ``type`` |> createItemFromClassOrInterfaceOrStruct)

let private createItemWhenDelegate ``type`` =
     ``type``.DelegateInvokeMethod
     |> Option.ofObj
     |> Option.map createItemFromDelegateInvokeMethod

let private createItemFromDelegateInvokeMethod method =
     {
          DependsUpon = method |> createDependsUponFromMethod
          Identifier = method.ContainingType.MetadataName
          Items = []
     }

let private createItemFromClassOrInterfaceOrStruct ``type`` =
     {
          DependsUpon =
               ``type`` |> createDependsUponFromTypeDeclaration
          Identifier =
               ``type``.MetadataName
          Items =
               ``type``.GetMembers ()
               |> Seq.choose createItemFromMember
               |> Seq.toList
     }

let private createItemFromMember ``member`` =
     ``member`` |> createItemWhenEventOrField
     |> Option.orElseWith (fun _ -> ``member`` |> createItemWhenMethod)
     |> Option.orElseWith (fun _ -> ``member`` |> createItemWhenType)