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
			[ 47, 125, 106, 107, 52, 83, 84, 37, 16, 43, 45, 48, 49, 44, 69, 46, 56, 42, 50, 38, 12, 14 ]
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