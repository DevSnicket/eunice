namespace DevSnicket.Eunice._AnalyzeProjectPath

open System

type Item =
    {
        DependsUpon: DependUpon list
        Identifier: String
        Items: Item list
    }