module rec DevSnicket.Eunice._AnalyzeProjectPath.CreateItemWhenDelegate

open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromSymbolsOfReferrer
open Microsoft.CodeAnalysis

let createItemWhenDelegate (``type``: INamedTypeSymbol) =
     let rec createItemWhenDelegate() =
          ``type``.DelegateInvokeMethod
          |> Option.ofObj
          |> Option.map createItemFromDelegateInvokeMethod

     and createItemFromDelegateInvokeMethod method =
          {
               DependsUpon =
                    seq [
                         yield! method.Parameters |> Seq.map (fun parameter -> parameter.Type)
                         method.ReturnType
                    ]
                    |> createDependsUponFromSymbolsOfReferrer ``type``
               Identifier =
                    method.ContainingType.MetadataName
               Items =
                    []
          }

     createItemWhenDelegate ()