module rec DevSnicket.Eunice._ExecuteProgram._WriteNameAndVersion.Tests

open DevSnicket.Eunice._ExecuteProgram.WriteNameAndVersion

type ConsoleColor = System.ConsoleColor
type String = System.String
type Version = System.Version

type private SideEffect =
    | ResetColor
    | SetForegroundColor of ConsoleColor
    | Write of String
    | WriteLine of String

[<Xunit.Fact>]
let writesEuniceWithColorAndThreePartVersion () =
    let actualSideEffects =
        new System.Collections.Generic.List<SideEffect>()

    writeNameAndVersion
        {|
            ResetColor = fun () -> actualSideEffects.Add(ResetColor)
            SetForegroundColor = fun color -> actualSideEffects.Add(SetForegroundColor color)
            Version = new Version(1, 2, 3, 4)
            Write = fun text -> actualSideEffects.Add(Write text)
            WriteLine = fun text -> actualSideEffects.Add(WriteLine text)
        |}

    Xunit.Assert.Equal<SideEffect> (
        seq [
            SetForegroundColor ConsoleColor.Red
            Write "e"
            SetForegroundColor ConsoleColor.Green
            Write "uni"
            SetForegroundColor ConsoleColor.Red
            Write "ce"
            ResetColor
            WriteLine " 1.2.3"
            WriteLine ""
        ],
        actualSideEffects
    )