import formatHtmlForIssues from "./formatHtmlForIssues.js";
import githubIssuesUrl from "./githubIssuesUrl.js";

fetch(githubIssuesUrl)
.then(response => response.json())
.then(setHtmlFromIssues);

function setHtmlFromIssues(
	issues,
) {
	setIssueListHtml(
		formatHtmlForIssues(
			issues
		),
	);
}

function setIssueListHtml(
	html,
) {
	document.getElementById("issues-list").innerHTML = html;
}