// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._ExecuteProgram._FormatHeaderComment.Tests

type DateTimeKind = System.DateTimeKind

open DevSnicket.Eunice._ExecuteProgram.FormatHeaderComment

[<Xunit.Fact>]
let Formats () =
    Xunit.Assert.Equal(
        "# created by Eunice for C# (https://devsnicket.com/eunice) version 1.2.3 on 0001-02-03T04:05:06.007Z",
        formatHeaderComment (DateTime(1, 2, 3, 4, 5, 6, 7, DateTimeKind.Utc), Version(1, 2, 3))
    )