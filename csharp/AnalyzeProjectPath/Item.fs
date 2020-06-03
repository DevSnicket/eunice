namespace DevSnicket.Eunice._AnalyzeProjectPath

open System

type Item =
    {
        Identifier: String
        Items: Item list
    }