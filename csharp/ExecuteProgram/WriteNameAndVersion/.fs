module DevSnicket.Eunice._ExecuteProgram.WriteNameAndVersion

type ConsoleColor = System.ConsoleColor
type Boolean = System.Boolean
type String = System.String
type Version = System.Version

let writeNameAndVersion
    (parameter:
    {|
        ResetColor: unit -> unit
        SetForegroundColor: ConsoleColor -> unit
        Version: Version
        Write: String -> unit
        WriteLine: String -> unit
    |}) =
    ConsoleColor.Red |> parameter.SetForegroundColor
    "e" |> parameter.Write
    ConsoleColor.Green |> parameter.SetForegroundColor
    "uni" |> parameter.Write 
    ConsoleColor.Red |> parameter.SetForegroundColor
    "ce" |> parameter.Write
    parameter.ResetColor ()
    " for C# " + parameter.Version.ToString(3) |> parameter.WriteLine
    "" |> parameter.WriteLine
