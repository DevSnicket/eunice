module DevSnicket.Eunice._ExecuteProgram.FormatHeaderComment

type DateTime = System.DateTime
type String = System.String
type Version = System.Version

let formatHeaderComment (dateTime: DateTime, version: Version) =
    seq [
        "# created by Eunice (https://devsnicket.com/eunice) version"
        version.ToString(3)
        "on"
        dateTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ") // cspell:disable-line
    ]
    |> String.concat " "
