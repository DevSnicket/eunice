import "https://unpkg.com/array-flat-polyfill";

fetch("https://api.github.com/repos/devsnicket/eunice/issues")
.then(response => response.json())
.then(setHtmlFromIssues);

function setHtmlFromIssues(
	issues,
) {
	setIssueListHtml(
		getHtmlForIssues(
			orderIssuesByNumber(
				getIssuesByNumber(),
			),
		),
	);

	function getIssuesByNumber() {
		return (
			new Map(
				issues.map(issue => [ issue.number, issue ]),
			)
		);
	}
}

function orderIssuesByNumber(
	issuesByNumber,
) {
	return (
		[
			...getAndDeleteWherePrioritySpecified(),
			...issuesByNumber.values(),
		]
	);

	function getAndDeleteWherePrioritySpecified() {
		return (
			[ 71, 70, 68, 53, 55, 43, 51, 52, 50, 45, 38, 37, 47, 69, 16, 48, 49, 44, 46, 56, 42, 12, 14 ]
			.flatMap(getAndDeleteWithNumber)
		);

		function getAndDeleteWithNumber(
			number,
		) {
			const issue = issuesByNumber.get(number);

			issuesByNumber.delete(number);

			return issue || [];
		}
	}
}

function getHtmlForIssues(
	issues,
) {
	return issues.map(getHtmlForIssue).join("");
}

function getHtmlForIssue(
	issue,
) {
	return `<div><a href="${issue.html_url}" target="_blank">${issue.title}</a></div>`;
}

function setIssueListHtml(
	html,
) {
	document.getElementById("issues-list").innerHTML = html;
}