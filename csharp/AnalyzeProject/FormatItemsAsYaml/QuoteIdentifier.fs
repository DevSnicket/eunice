module DevSnicket.Eunice._AnalyzeProject._FormatItemsAsYaml.QuoteIdentifier

let quoteIdentifier identifier =
    let rec quoteIdentifier () =
        match isQuotationRequired with
        | true ->
            "\"" + identifier + "\""
        | false ->
            identifier

    and isQuotationRequired =
        [
            "null"
            "Null"
            "true"
            "True"
            "false"
            "False"
        ]
        |> List.contains identifier

    quoteIdentifier ()