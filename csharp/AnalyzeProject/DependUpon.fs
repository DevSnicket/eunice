namespace DevSnicket.Eunice._AnalyzeProject

open System

type DependUpon =
    {
        Identifier: String
        Items: DependUpon list
    }