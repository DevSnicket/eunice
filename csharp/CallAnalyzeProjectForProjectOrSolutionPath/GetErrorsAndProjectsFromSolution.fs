// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.GetErrorsAndProjectsFromSolution

open DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.FormatNotSupportedErrorForProject
open DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.IsProjectSupported

type Project = Microsoft.CodeAnalysis.Project
type Solution = Microsoft.CodeAnalysis.Solution
type String = System.String

type ErrorOrProject =
    | Error of String
    | Project of Project

let rec getErrorsAndProjectsFromSolution (solution: Solution) =
    solution.Projects
    |> Seq.sortBy (solution |> getProjectDependencyIndexInSolution)
    |> analyzeFirstOfEachAssemblyInSupportedProjects

let private getProjectDependencyIndexInSolution solution =
    let orderedProjectIdentifiers =
        solution.GetProjectDependencyGraph().GetTopologicallySortedProjects()
        |> Seq.toList

    let getProjectDependencyIndex (project: Project) =
        orderedProjectIdentifiers
        |> List.findIndex (fun projectIdentifier -> projectIdentifier = project.Id)

    getProjectDependencyIndex

let private analyzeFirstOfEachAssemblyInSupportedProjects projects =
    projects
    |> Seq.groupBy (fun project -> project.AssemblyName)
    |> Seq.collect (fun (_, projects) -> projects |> analyzeFirstSupportedProject)

let private analyzeFirstSupportedProject projects =
    projects
    |> Seq.tryFind isProjectSupported
    |> Option.map (fun supportedProject -> seq [ Project supportedProject ])
    |> Option.defaultWith (fun () -> projects |> Seq.map (formatNotSupportedErrorForProject >> Error))