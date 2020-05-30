import "../array-flat-polyfill.js";
import groupBy from "./lodash/groupBy.js";

export default
	log =>
		[
			...getHtmlFragmentsFromCommitsByDates(
				groupBy(
					getCommitsFromLog(log),
					"date"
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
		.map(getCommitFromLog)
	);
}

function getCommitFromLog(
	commit,
) {
	return (
		getCommitFromLines(
			commit.split("\n"),
		)
	);
}

function getCommitFromLines(
	[ date, ...messageLines ],
) {
	return (
		{
			date,
			messageLines: messageLines.filter(line => line),
		}
	);
}

function getHtmlFragmentsFromCommitsByDates(
	commitsByDates,
) {
	return (
		Object.entries(commitsByDates)
		.flatMap(
			([ date, commits ]) =>
				[
					date,
					`<blockquote>${getHtmlForCommitMessages(commits)}</blockquote>`,
				]
		)
	);
}

function getHtmlForCommitMessages(
	commits,
) {
	return (
		commits
		.map(getHtmlForCommit)
		.join("")
	);
}

function getHtmlForCommit({
	messageLines,
}) {
	return `<p>${messageLines.join("<br/>")}</p>`;
}