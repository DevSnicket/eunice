module DevSnicket.Eunice._AnalyzeProjectPath._FormatItemsAsYaml.IndentLines

let indentLines lines =
    lines
    |> Seq.map (fun line -> "  " + line)