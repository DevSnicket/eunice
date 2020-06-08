module rec DevSnicket.Eunice._AnalyzeProjectPath.GetTypesUsedInMethodDeclaration

open Microsoft.CodeAnalysis

let getTypesUsedInMethodDeclaration (method: IMethodSymbol) =
     seq [
          yield! method.Parameters |> Seq.map (fun parameter -> parameter.Type)
          method.ReturnType
     ]