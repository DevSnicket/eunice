module rec DevSnicket.Eunice.AnalyzeProjectPath

open DevSnicket.Eunice._AnalyzeProjectPath
open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes
open DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromTypes.CreateDependUponFromType
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

let createItemWhenNamespaceOrType =
     function
     | :? INamespaceSymbol as ``namespace`` ->
          Some (``namespace`` |> createItemFromNamespace)
     | ``type`` ->
          ``type`` |> createItemWhenType

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
     | :? INamedTypeSymbol as ``type`` ->
          Some (``type`` |> createItemFromType)
     | _ ->
          None

let createItemFromType ``type`` =
     match ``type``.EnumUnderlyingType with
     | null ->
          ``type`` |> createItemFromClassOrInterfaceOrStruct
     | _ ->
          {
               DependsUpon = []
               Identifier = ``type``.Name
               Items = []
          }

let createItemFromClassOrInterfaceOrStruct ``type`` =
     {
          DependsUpon =
               seq [
                    yield! ``type``.BaseType |> Option.ofObj |> Option.toList
                    yield! ``type``.Interfaces
               ]
               |> createDependsUponFromTypes
          Identifier =
               ``type``.MetadataName
          Items =
               ``type``.GetMembers ()
               |> Seq.choose createItemWhenFieldOrType
               |> Seq.toList
     }

let createItemWhenFieldOrType =
     function
     | :? IFieldSymbol as field ->
          Some (field |> createItemFromField)
     | ``member`` ->
          ``member`` |> createItemWhenType

let createItemFromField field =
     {
          DependsUpon =
               field.Type
               |> createDependUponFromType
               |> Option.toList
          Identifier =
               field.Name
          Items =
               []
     }