namespace DevSnicket.Eunice

open System

type AnalysisResult =
    {
        Errors: String seq
        Yaml: String seq
    }