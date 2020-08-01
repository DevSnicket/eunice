module DevSnicket.Eunice._AnalyzeProject.GetIdentifierOfAssemblyFromCompilation

open Microsoft.CodeAnalysis

// function implementation is inlined into callers by F#
[<System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage>]
let getIdentifierOfAssemblyFromCompilation (compilation: Compilation) =
    compilation.SourceModule.Name