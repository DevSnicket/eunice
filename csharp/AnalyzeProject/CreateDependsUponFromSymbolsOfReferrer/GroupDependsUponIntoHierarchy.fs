module rec DevSnicket.Eunice._AnalyzeProject._CreateDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy

open DevSnicket.Eunice._AnalyzeProject

let groupDependsUponIntoHierarchy dependsUpon =
    dependsUpon
    |> Seq.groupBy (fun dependUpon -> dependUpon.Identifier)
    |> Seq.map groupDependsUponInIdentifierGroup
    |> Seq.sortBy (fun dependUpon -> dependUpon.Identifier)

let private groupDependsUponInIdentifierGroup (identifier, dependsUpon) =
    {
        Identifier =
            identifier
        Items =
            dependsUpon
            |> Seq.collect (fun dependUpon -> dependUpon.Items)
            |> groupDependsUponIntoHierarchy
            |> Seq.toList
    }