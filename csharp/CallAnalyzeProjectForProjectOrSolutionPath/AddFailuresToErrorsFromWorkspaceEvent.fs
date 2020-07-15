module DevSnicket.Eunice._CallAnalyzeProjectForProjectOrSolutionPath.AddFailuresToErrorsFromWorkspaceEvent

open DevSnicket.Eunice

type List<'T> = System.Collections.Generic.List<'T>
type String = System.String
type Workspace = Microsoft.CodeAnalysis.Workspace

let addFailuresToErrorsFromWorkspaceEvent (workspace: Workspace) =
    let workspaceFailures = List<String>()

    let rec addEventHandler () =
        addWorkspaceFailureFromEvent |> workspace.WorkspaceFailed.Add

    and addWorkspaceFailureFromEvent event =
        event.Diagnostic.Message
        |> workspaceFailures.Add

    let addFailuresToErrors result =
        {
            Errors =
                seq [
                    yield! workspaceFailures
                    yield! result.Errors
                ]
            Yaml =
                result.Yaml
        }

    addEventHandler ()

    addFailuresToErrors