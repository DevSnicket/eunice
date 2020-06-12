module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenDelegate

open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbolsOfReferrer
open Microsoft.CodeAnalysis

let createItemWhenDelegate (``type``: INamedTypeSymbol) =
     ``type``.DelegateInvokeMethod
     |> Option.ofObj
     |> Option.map createItemFromDelegateInvokeMethod

let private createItemFromDelegateInvokeMethod method =
     {
          DependsUpon =
               seq [
                    yield! method.Parameters |> Seq.map (fun parameter -> parameter.Type)
                    method.ReturnType
               ]
               |> createDependsUponFromSymbolsOfReferrer method
          Identifier =
               method.ContainingType.MetadataName
          Items =
               []
     }
