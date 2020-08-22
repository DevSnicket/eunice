// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._AnalyzeProject._CreateItemWhenNamedType._CreateDependsUponFromSymbolsOfReferrer.GroupDependsUponIntoHierarchy

type DependUpon = DevSnicket.Eunice._AnalyzeProject.DependUpon

let groupDependsUponIntoHierarchy (dependsUpon: DependUpon seq): DependUpon seq =
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