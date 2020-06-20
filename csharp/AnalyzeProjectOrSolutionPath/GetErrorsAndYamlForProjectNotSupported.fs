module DevSnicket.Eunice._AnalyzeProjectOrSolutionPath.GetErrorsAndYamlForProjectNotSupported

open DevSnicket.Eunice

type Project = Microsoft.CodeAnalysis.Project

let getErrorsAndYamlForProjectNotSupported (project: Project) =
    async.Return
        {
            Errors = seq [ "Project " + project.Name + " loaded with no metadata references." ]
            Yaml = seq []
        }