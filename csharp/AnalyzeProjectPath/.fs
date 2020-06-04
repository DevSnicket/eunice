module rec DevSnicket.Eunice.AnalyzeProjectPath

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes
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

let createItemsFromMembersOfNamespace ``namespace`` =
     ``namespace``.GetMembers ()
     |> Seq.choose createItemWhenNamespaceOrType
     |> Seq.sortBy (fun item -> item.Identifier)

let createItemWhenNamespaceOrType namespaceOrType =
     namespaceOrType
     |> createItemWhenType
     |> Option.orElse (namespaceOrType |> createItemWhenNamespace)

let createItemWhenNamespace =
     function
     | :? INamespaceSymbol as ``namespace`` ->
          Some (``namespace`` |> createItemFromNamespace)
     | _ ->
          None

let createItemFromNamespace ``namespace`` =
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

let createItemWhenType: (ISymbol -> Item option) =
     function
     | :? ITypeSymbol as ``type`` ->
          Some (``type`` |> createItemFromType)
     | _ ->
          None

let createItemFromType ``type`` =
     {
          DependsUpon =
               seq [
                    if not <| isNull ``type``.BaseType then yield ``type``.BaseType
                    yield! ``type``.Interfaces
               ]
               |> createDependsUponFromTypes
          Identifier =
               ``type``.Name
          Items =
               ``type``.GetMembers ()
               |> Seq.choose createItemWhenType
               |> Seq.toList
     }