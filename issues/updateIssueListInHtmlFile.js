import formatHtmlForIssues from "./formatHtmlForIssues.js";
import githubIssuesUrl from "./githubIssuesUrl.js";
import nodejsJsonRequest from "../nodejsJsonRequest.js";
import { updateInHtmlIndexFile } from "../textFiles.js";

nodejsJsonRequest(
	githubIssuesUrl,
)
.then(
	issues =>
		updateInHtmlIndexFile({
			content:
				formatHtmlForIssues(
					issues,
				),
			tag:
				"issuesList",
		}),
);