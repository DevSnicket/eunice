module rec DevSnicket.Eunice._WriteInteractiveInDirectoryPathWithYaml.Test

open DevSnicket.Eunice.WriteInteractiveInDirectoryPathWithYaml

type Assembly = System.Reflection.Assembly
type File = System.IO.File
type Path = System.IO.Path

[<Xunit.Fact>]
let writesWithYamlOfMultipleLinesContainingQuotes () =
    async {
        let directoryPath =
            Assembly.GetExecutingAssembly().Location
            |> Path.GetDirectoryName

        "eunice.html" |> deleteWhenExists

        do!
            [
                "test yaml file contents"
                "on multiple lines with a quote character \""
            ]
            |> writeInteractiveInDirectoryPathWithYaml directoryPath

        let! actual =
            [| directoryPath; "eunice.html" |]
            |> Path.Join
            |> File.ReadAllTextAsync
            |> Async.AwaitTask

        actual.Contains("\"test yaml file contents\\non multiple lines with a quote character \\\"\"")
        |> Xunit.Assert.True
    }

let private deleteWhenExists path =
    if path |> File.Exists then
        path |> File.Delete