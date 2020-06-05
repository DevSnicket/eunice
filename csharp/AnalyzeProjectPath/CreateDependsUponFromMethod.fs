module DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromMethod

open DevSnicket.Eunice._AnalyzeProjectPath.CreateDependsUponFromTypes
open Microsoft.CodeAnalysis

let createDependsUponFromMethod (method: IMethodSymbol) =
    seq [
         yield! method.Parameters |> Seq.map (fun parameter -> parameter.Type)
         method.ReturnType
    ]
    |> createDependsUponFromTypes