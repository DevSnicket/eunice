module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.IndentLines

let indentLines lines =
    lines
    |> Seq.map (fun line -> "  " + line)