module DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.FormatNotSupportedErrorForProject

type Project = Microsoft.CodeAnalysis.Project

let formatNotSupportedErrorForProject (project: Project) =
    "Project " + project.Name + " not analysed as it loaded with no metadata references."