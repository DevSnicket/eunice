import formatHtmlForIssues from "./formatHtmlForIssues.js";
import githubIssuesUrl from "./githubIssuesUrl.js";
import githubNodejsJsonRequest from "../githubNodejsJsonRequest.js";
import { updateInHtmlIndexFile } from "../textFiles.js";

githubNodejsJsonRequest(
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