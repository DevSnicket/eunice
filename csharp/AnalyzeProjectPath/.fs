module rec DevSnicket.Eunice.AnalyzeProjectPath

open DevSnicket.Eunice._AnalyzeProjectPath
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
     |> Seq.map createItemFromNamespaceOrType

let createItemFromNamespaceOrType namespaceOrType =
     {
          Identifier =
               namespaceOrType.Name
          Items =
               match namespaceOrType with
               | :? INamespaceSymbol as ``namespace`` ->
                    ``namespace``
                    |> createItemsFromMembersOfNamespace
                    |> Seq.toList
               | _ ->
                    []
     }