// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._AnalyzeProject.GetIdentifierOfAssembly

type IAssemblySymbol = Microsoft.CodeAnalysis.IAssemblySymbol

let getIdentifierOfAssembly (assembly: IAssemblySymbol) =
    (assembly.Modules |> Seq.head).Name