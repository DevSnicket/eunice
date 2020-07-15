module DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.IsProjectSupported

type Project = Microsoft.CodeAnalysis.Project

let isProjectSupported (project: Project) =
    project.MetadataReferences.Count > 0