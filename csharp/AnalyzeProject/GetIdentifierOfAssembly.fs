module rec DevSnicket.Eunice._AnalyzeProject.GetIdentifierOfAssembly

type IAssemblySymbol = Microsoft.CodeAnalysis.IAssemblySymbol

let getIdentifierOfAssembly (assembly: IAssemblySymbol) =
    (assembly.Modules |> Seq.head).Name