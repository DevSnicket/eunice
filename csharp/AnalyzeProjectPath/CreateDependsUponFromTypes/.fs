module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes

open DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromTypes.CreateDependUponFromType
open DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromTypes.GroupDependsUponIntoHierarchy

let createDependsUponFromTypes types =
     types
     |> Seq.choose createDependUponFromType
     |> groupDependsUponIntoHierarchy
     |> Seq.toList