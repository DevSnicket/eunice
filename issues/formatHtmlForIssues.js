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
	const issuesWherePrioritySpecified =
		getAndDeleteWherePrioritySpecified();

	return (
		[
			...issuesByNumber.values(),
			...issuesWherePrioritySpecified,
		]
	);

	function getAndDeleteWherePrioritySpecified() {
		return (
			[ 160, 44, 159, 45, 161, 49, 162, 56, 46, 149, 125, 106, 107, 83, 84, 37, 69, 38, 43, 42 ]
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