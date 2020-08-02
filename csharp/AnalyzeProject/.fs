module rec DevSnicket.Eunice.AnalyzeProject

open DevSnicket.Eunice._AnalyzeProject
open DevSnicket.Eunice._AnalyzeProject.CreateItemWhenNamedType
open DevSnicket.Eunice._AnalyzeProject.FormatItemsAsYaml
open DevSnicket.Eunice._AnalyzeProject.GetIdentifierOfAssembly
open Microsoft.CodeAnalysis

type MemberBehavior = DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType.MemberBehavior

let analyzeProject (memberBehavior: MemberBehavior) (project: Project) =
    async {
        let! compilation =
            project.GetCompilationAsync ()
            |> Async.AwaitTask

        return
            {
                Errors =
                    compilation.GetDiagnostics()
                    |> Seq.choose formatWhenError
                Yaml =
                    compilation
                    |> createItemsInCompilation memberBehavior
                    |> formatItemsAsYaml
            }
    }

let private formatWhenError diagnostic =
    match diagnostic.Severity with
    | DiagnosticSeverity.Error ->
        Some (diagnostic.ToString())
    | _ ->
        None

let private createItemsInCompilation memberBehavior compilation =
    let rec createItemsInCompilation () =
        seq [ {
            DependsUpon =
                []
            Identifier =
                compilation.Assembly
                |> getIdentifierOfAssembly
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
                ``type`` |> createItemWhenNamedType memberBehavior getSymbolFromSyntaxNode
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
        |> getSemanticModelOfSyntaxTree
        |> (fun semanticModel -> syntaxNode |> semanticModel.GetSymbolInfo)
        |> (fun symbolInfo -> symbolInfo.Symbol)

    and getSemanticModelOfSyntaxTree: (SyntaxTree -> SemanticModel) =
        let cache = new System.Collections.Generic.Dictionary<_,_>()

        fun syntaxTree ->
            match syntaxTree |> cache.TryGetValue with
            | (true, semanticModel) ->
                semanticModel
            | (false, _) ->
                let semanticModel =
                    syntaxTree
                    |> compilation.GetSemanticModel

                cache.Add(syntaxTree, semanticModel)

                semanticModel

    createItemsInCompilation ()