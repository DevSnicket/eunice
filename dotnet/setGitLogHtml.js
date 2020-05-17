import "../array-flat-polyfill.js";

fetch("./git-log.txt")
.then(response => response.text())
.then(setHtmlFromLog);

function setHtmlFromLog(
	log,
) {
	return (
		setHtmlFromCommits(
			[
				...getHtmlFragmentsFromCommitMessagesByDates(
					new Map(
						getCommitsFromLog(log)
						.map(getKeyValueFromCommit),
					),
				),
			]
			.join("")
		)
	);
}

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

function setHtmlFromCommits(
	commits,
) {
	document.getElementById("git-log").innerHTML = commits;
}