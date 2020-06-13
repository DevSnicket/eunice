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