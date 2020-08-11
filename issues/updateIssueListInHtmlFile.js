import formatHtmlForIssues from "./formatHtmlForIssues.js";
import githubIssuesUrl from "./githubIssuesUrl.js";
import githubNodejsJsonRequest from "../githubNodejsJsonRequest.js";
import updateInHtmlFile from "../updateInHtmlFile.js";

(async () => {
	await updateInHtmlFile({
		content:
			formatHtmlForIssues(
				await githubNodejsJsonRequest(
					githubIssuesUrl,
				)
			),
		filePath:
			"./index.html",
		tag:
			"issuesList",
	});
})();