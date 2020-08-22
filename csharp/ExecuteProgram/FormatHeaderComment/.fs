// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
module DevSnicket.Eunice._ExecuteProgram.FormatHeaderComment

type DateTime = System.DateTime
type String = System.String
type Version = System.Version

let formatHeaderComment (dateTime: DateTime, version: Version) =
    seq [
        "# created by Eunice for C# (https://devsnicket.com/eunice) version"
        version.ToString(3)
        "on"
        dateTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ") // cspell:disable-line
    ]
    |> String.concat " "
