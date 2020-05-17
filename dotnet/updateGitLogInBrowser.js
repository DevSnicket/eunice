import formatHtmlForGitLog from "./formatHtmlForGitLog.js";

fetch("./git-log.txt")
.then(
	response =>
		response.text()
)
.then(
	log =>
		setGitLogHtml(
			formatHtmlForGitLog(
				log,
			),
		),
);

function setGitLogHtml(
	gitLogHtml,
) {
	document.getElementById("git-log").innerHTML = gitLogHtml;
}