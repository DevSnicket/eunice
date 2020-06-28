module rec DevSnicket.Eunice.WriteInteractiveInDirectoryPathWithYaml

open DevSnicket.Eunice.ReadTextFromEmbedded

type File = System.IO.File
type Path = System.IO.Path
type String = System.String

let writeInteractiveInDirectoryPathWithYaml directoryPath yaml =
    async {
        let! html =
            [ "WriteInteractiveInDirectoryPathWithYaml"; "index.html" ]
            |> readTextFromEmbedded

        do!
            File.WriteAllTextAsync (
                [| directoryPath; "eunice.html" |] |> Path.Join,
                html.Replace(
                    "yamlFromWebpack",
                    yaml |> getStringLiteral
                )
            )
            |> Async.AwaitTask
    }

let private getStringLiteral lines =
    lines
    |> String.concat "\\n"
    |> escapeQuotes
    |> addQuoteDelimiters

let private escapeQuotes value =
    value.Replace("\"", "\\\"")

let private addQuoteDelimiters value =
    "\"" + value + "\""