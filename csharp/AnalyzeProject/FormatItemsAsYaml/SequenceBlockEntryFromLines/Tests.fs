// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.SequenceBlockEntryFromLines.Test

open DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.SequenceBlockEntryFromLines
open System

// following behavior is impossible to recreate in file-system/integration test cases
[<Xunit.Fact>]
let BlockSequenceLinesOfEmpty () =
    Xunit.Assert.Equal<String seq>(
        seq [],
        sequenceBlockEntryFromLines []
    )