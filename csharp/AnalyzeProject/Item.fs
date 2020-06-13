namespace DevSnicket.Eunice._AnalyzeProject

open System

type Item =
    {
        DependsUpon: DependUpon list
        Identifier: String
        Items: Item list
    }