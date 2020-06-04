module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes

open DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromTypes.CreateDependUponFromType
open DevSnicket.Eunice._AnalyzeProjectPath._CreateDependsUponFromTypes.GroupDependsUponIntoHierarchy
open Microsoft.CodeAnalysis

let createDependsUponFromTypes (types: INamedTypeSymbol seq) =
     types
     |> Seq.collect createDependUponFromNamedType
     |> groupDependsUponIntoHierarchy
     |> Seq.toList

let private createDependUponFromNamedType ``type`` =
     seq [
          ``type`` :> ITypeSymbol
          yield! ``type``.TypeArguments
     ]
     |> Seq.choose createDependUponFromType