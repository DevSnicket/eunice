namespace DevSnicket.Eunice._AnalyzeProjectPath

open System

type DependUpon =
    {
        Identifier: String
        Items: DependUpon list
    }