import formatHtmlForIssues from "./formatHtmlForIssues.js";
import githubIssuesUrl from "./githubIssuesUrl.js";
import https from "https";
import { updateInHtmlIndexFile } from "../textFiles.js";

https.get(
	{
		...githubIssuesUrl,
		headers: { "User-Agent": "Mozilla/5.0" },
	},
	result => {
		result.setEncoding("utf8");
		
		let body = "";
		
		result.on(
			"data",
			data => body += data,
		);

		result.on(
			"end",
			() =>
				updateInHtmlIndexFile({
					content:
						formatHtmlForIssues(
							JSON.parse(body),
						),
					tag:
						"issuesList",
				}),
		);
	}
);