module rec DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromTypes.GroupDependsUponIntoHierarchy

open DevSnicket.Eunice._AnalyzeProjectPath

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