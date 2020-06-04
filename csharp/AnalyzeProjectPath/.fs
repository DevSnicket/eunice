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
     |> Seq.choose createItemWhenNamespaceOrType

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
               ``type``.BaseType
               |> createDependsUponFromBaseType
          Identifier =
               ``type``.Name
          Items =
               ``type``.GetMembers ()
               |> Seq.choose createItemWhenType
               |> Seq.toList
     }

let createDependsUponFromBaseType =
     function
     | null ->
          []
     | baseType ->
          match baseType.SpecialType with
          | SpecialType.None ->
               createDependsUponAncestors
                    baseType
                    [ {
                         Identifier = baseType.Name
                         Items = []
                    } ]
          | _ ->
               []

let createDependsUponAncestors (symbol: ISymbol) items =
     match symbol.ContainingSymbol.Name with
     | "" ->
          items
     | _ ->
          createDependsUponAncestors
               symbol.ContainingSymbol
               [ {
                    Identifier = symbol.ContainingSymbol.Name;
                    Items = items
               } ]