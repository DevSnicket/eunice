// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
namespace DevSnicket.Eunice._AnalyzeProject

open System

type DependUpon =
    {
        Identifier: String
        Items: DependUpon list
    }