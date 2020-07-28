module DevSnicket.Eunice._ExecuteProgram._FormatHeaderComment.Tests

open DevSnicket.Eunice._ExecuteProgram.FormatHeaderComment

[<Xunit.Fact>]
let Formats () =
    Xunit.Assert.Equal(
        "# created by Eunice (http://devsnicket.com/eunice) version 1.2.3 on 0001-02-03T04:05:06.007Z",
        formatHeaderComment (DateTime(1, 2, 3, 4, 5, 6, 7), Version(1, 2, 3))
    )