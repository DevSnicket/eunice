namespace DevSnicket.Eunice._ExecuteProgram._GetOrPromptForLicenseAcceptance

open DevSnicket.Eunice._ExecuteProgram.GetOrPromptForLicenseAcceptance
open DevSnicket.Eunice._ExecuteProgram._GetOrPromptForLicenseAcceptance.CommercialUseText

type ConsoleColor = System.ConsoleColor
type File = System.IO.File
type String = System.String
type Object = System.Object
type Path = System.IO.Path
type Queue<'T> = System.Collections.Generic.Queue<'T>
type Version = System.Version

type private TestCase =
    {
        IsAcceptedInArguments: Boolean
        IsInteractive: Boolean
        Expected:
            {|
                IsAccepted: Boolean
                WriteLines: String list
            |}
        ReadKeysQueue: Queue<ConsoleKey>
    }

type Tests () =
    [<Xunit.Theory>]
    [<Xunit.MemberData ("TestCases")>]
    let testTestCase testCase =
        async {
            let actualWriteLines =
                new System.Collections.Generic.List<String>()

            let! actualIsAccepted =
                getOrPromptForLicenseAcceptance
                    {|
                        IsAcceptedInArguments = testCase.IsAcceptedInArguments
                        IsInteractive = testCase.IsInteractive
                        ReadKey = testCase.ReadKeysQueue.Dequeue
                        WriteLine = actualWriteLines.Add
                    |}

            Xunit.Assert.Equal (
                testCase.Expected,
                {|
                    IsAccepted = actualIsAccepted
                    WriteLines = actualWriteLines |> Seq.toList
                |}
            )
        }

    static member TestCases =
        let licence =
            [| ".."; ".."; ".."; ".."; "LICENSE" |]
            |> Path.Join
            |> File.ReadAllLines

        let explanationWriteLines =
            [
                "To use this program you must accept the license http://www.devsnicket.com/eunice/licensing"
                commercialUseText
                ""
            ]

        let instructionsWriteLines =
            [
                "To accept, press the A key or run again with the --accept-license argument."
                "Press the V key to view the license."
                "Any other key will exit without accepting the license."
                ""
            ]

        let promptWriteLines =
            [
                yield! explanationWriteLines
                yield! instructionsWriteLines
            ]

        seq [
            {
                IsAcceptedInArguments =
                    false
                IsInteractive =
                    false
                Expected =
                    {|
                        IsAccepted =
                            false
                        WriteLines =
                            [
                                "To use this program you must accept the license http://www.devsnicket.com/eunice/licensing"
                                commercialUseText
                                ""
                                "To accept run again with the --accept-license argument."
                            ]
                    |}
                ReadKeysQueue =
                    new Queue<ConsoleKey>()
            }
            {
                IsAcceptedInArguments =
                    true
                IsInteractive =
                    false
                Expected =
                    {|
                        IsAccepted =
                            true
                        WriteLines =
                            [
                                "By specifying --accept-license you have accepted the license http://www.devsnicket.com/eunice/licensing"
                                commercialUseText
                                ""
                            ]
                    |}
                ReadKeysQueue =
                    new Queue<ConsoleKey>()
            }
            {
                IsAcceptedInArguments =
                    false
                IsInteractive =
                    true
                Expected =
                    {|
                        IsAccepted =
                            false
                        WriteLines =
                            promptWriteLines
                    |}
                ReadKeysQueue =
                    new Queue<ConsoleKey>([ ConsoleKey.Enter ])
            }
            {
                IsAcceptedInArguments =
                    false
                IsInteractive =
                    true
                Expected =
                    {|
                        IsAccepted =
                            true
                        WriteLines =
                            promptWriteLines
                    |}
                ReadKeysQueue =
                    new Queue<ConsoleKey>([ ConsoleKey.A ])
            }
            {
                IsAcceptedInArguments =
                    false
                IsInteractive =
                    true
                Expected =
                    {|
                        IsAccepted =
                            false
                        WriteLines =
                            [
                                yield! promptWriteLines
                                yield! licence
                                ""
                                yield! instructionsWriteLines
                            ]
                    |}
                ReadKeysQueue =
                    new Queue<ConsoleKey>([ ConsoleKey.V; ConsoleKey.Enter ])
            }
        ]
        |> Seq.map (fun testCase -> [| testCase :> Object |])