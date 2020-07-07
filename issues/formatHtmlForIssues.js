import "../array-flat-polyfill.js";

export default
	issues =>
		getHtmlForIssues(
			orderIssuesByNumber(
				getIssuesByNumber(
					issues,
				),
			),
		);

function getIssuesByNumber(
	issues,
) {
	return (
		new Map(
			issues.map(issue => [ issue.number, issue ]),
		)
	);
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
			[ 50, 45, 125, 106, 107, 83, 84, 37, 49, 44, 56, 16, 69, 46, 38, 43, 42 ]
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
	return `<ol>${issues.map(getHtmlForIssue).join("")}</ol>`;
}

function getHtmlForIssue(
	issue,
) {
	return `<li><a href="${issue.html_url}" rel="noopener" target="_blank">${issue.title}</a></li>`;
}