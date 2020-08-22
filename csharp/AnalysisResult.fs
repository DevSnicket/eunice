// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
namespace DevSnicket.Eunice

open System

type AnalysisResult =
    {
        Errors: String seq
        Yaml: String seq
    }