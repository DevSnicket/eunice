// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.IndentLines

let indentLines lines =
    lines
    |> Seq.map (fun line -> "  " + line)