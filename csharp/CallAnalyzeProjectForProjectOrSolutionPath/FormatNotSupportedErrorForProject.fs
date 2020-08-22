// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.FormatNotSupportedErrorForProject

type Project = Microsoft.CodeAnalysis.Project

let formatNotSupportedErrorForProject (project: Project) =
    "Project " + project.Name + " not analysed as it loaded with no metadata references."