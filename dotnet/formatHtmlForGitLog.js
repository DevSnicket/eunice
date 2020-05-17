export default
	log =>
		[
			...getHtmlFragmentsFromCommitMessagesByDates(
				new Map(
					getCommitsFromLog(log)
					.map(getKeyValueFromCommit),
				),
			),
		]
		.join("");

function getCommitsFromLog(
	log,
) {
	return (
		log
		.split("---\n")
		.filter(commit => commit)
	);
}

function getKeyValueFromCommit(
	commit,
) {
	return (
		getKeyValueFromCommitLines(
			commit.split("\n"),
		)
	);
}

function getKeyValueFromCommitLines(
	[ date, ...messageLines ],
) {
	return (
		[
			date,
			messageLines.filter(line => line),
		]
	);
}

function * getHtmlFragmentsFromCommitMessagesByDates(
	messagesByDates,
) {
	for (const [ date, messages ] of messagesByDates)
		yield `<p>${[ date, ...messages ].join("<br/>")}</p>`;
}