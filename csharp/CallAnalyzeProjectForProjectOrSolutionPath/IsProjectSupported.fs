// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.IsProjectSupported

type Project = Microsoft.CodeAnalysis.Project

// function implementation is inlined into callers by F#
[<System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage>]
let isProjectSupported (project: Project) =
    project.MetadataReferences.Count > 0