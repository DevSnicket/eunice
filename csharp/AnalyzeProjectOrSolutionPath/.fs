module rec DevSnicket.Eunice.AnalyzeProjectOrSolutionPath

open DevSnicket.Eunice.AnalyzeProject
open System
open System.IO

let analyzeProjectOrSolutionPath (projectOrSolutionPath: String) =
     match projectOrSolutionPath |> Path.GetExtension with
     | ".sln" -> // cSpell:ignore sln
          projectOrSolutionPath |> analyzeSolutionPath
     | _ ->
          projectOrSolutionPath |> analyzeProjectPath

let private analyzeSolutionPath solutionPath =
     async {
          use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

          let! solution =
               solutionPath
               |> workspace.OpenSolutionAsync
               |> Async.AwaitTask

          let! errorsAndYamlOfProjects =
               solution.Projects
               |> analyzeFirstOfEachAssemblyInSupportedProjects
               |> Async.Parallel

          return
               {
                    Errors =
                         errorsAndYamlOfProjects
                         |> Seq.collect (fun errorsAndYaml -> errorsAndYaml.Errors)
                    Yaml =
                         errorsAndYamlOfProjects
                         |> Seq.collect (fun errorsAndYaml -> errorsAndYaml.Yaml)
               }
     }

let private analyzeFirstOfEachAssemblyInSupportedProjects projects =
     projects
     |> Seq.groupBy (fun project -> project.AssemblyName)
     |> Seq.collect (fun (_, projects) -> projects |> analyzeFirstSupportedProject)

let private analyzeFirstSupportedProject projects =
     projects
     |> Seq.tryFind isProjectSupported
     |> Option.map (fun supportedProject -> seq [ supportedProject |> analyzeProject ])
     |> Option.defaultWith (fun () -> projects |> Seq.map getErrorsAndYamlForProjectNotSupported)

let private analyzeProjectPath projectPath =
     async {
          use workspace = Microsoft.CodeAnalysis.MSBuild.MSBuildWorkspace.Create ()

          let! project =
               projectPath
               |> workspace.OpenProjectAsync
               |> Async.AwaitTask

          return!
               match project |> isProjectSupported with
               | true ->
                    project |> analyzeProject
               | false ->
                    project |> getErrorsAndYamlForProjectNotSupported
     }

let private getErrorsAndYamlForProjectNotSupported project =
     async.Return
          {
               Errors = seq [ "Project " + project.Name + " loaded with no metadata references." ]
               Yaml = seq []
          }

let private isProjectSupported project =
     project.MetadataReferences.Count > 0