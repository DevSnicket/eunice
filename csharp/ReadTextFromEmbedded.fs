// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module rec DevSnicket.Eunice.ReadTextFromEmbedded

type Assembly = System.Reflection.Assembly
type StreamReader = System.IO.StreamReader

let readTextFromEmbedded names =
    async {
        let stream =
            names
            |> formatNames
            |> Assembly.GetExecutingAssembly().GetManifestResourceStream
        
        use streamReader = new StreamReader(stream)
        
        let! text =
            streamReader.ReadToEndAsync()
            |> Async.AwaitTask
        
        return text;
    }

let private formatNames names =
    [
        "DevSnicket"
        "Eunice"
        yield! names
    ]
    |> String.concat "."