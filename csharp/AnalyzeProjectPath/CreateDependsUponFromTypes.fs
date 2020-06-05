module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes

open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependUponFromType

let createDependsUponFromTypes types =
     types
     |> Seq.choose createDependUponFromType
     |> groupDependsUponIntoHierarchy
     |> Seq.toList

let private groupDependsUponIntoHierarchy dependsUpon =
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