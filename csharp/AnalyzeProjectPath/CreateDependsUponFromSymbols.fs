module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbols

open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependUponFromSymbol

let createDependsUponFromSymbols symbols =
     symbols
     |> Seq.choose createDependUponFromSymbol
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