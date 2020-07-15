module DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.IsProjectSupported

type Project = Microsoft.CodeAnalysis.Project

// function implementation is inlined into callers by F#
[<System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage>]
let isProjectSupported (project: Project) =
    project.MetadataReferences.Count > 0