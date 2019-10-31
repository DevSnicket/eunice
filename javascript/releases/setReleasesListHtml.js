import "https://unpkg.com/array-flat-polyfill";

fetchJson("https://api.github.com/search/issues?q=released%20in%20javascript+repo:devsnicket/eunice+in:comments")
.then(setHtmlFromSearchResults);

function setHtmlFromSearchResults({
	items,
}) {
	Promise.all(items.map(addVersionToIssue))
	.then(
		issues =>
			setListHtml(
				getHtmlForReleases(
					getReleasesForIssues(issues)
					.sort(compareRelease),
				),
			)
	);
}

function addVersionToIssue({
	comments_url,
	html_url,
	title,
}) {
	return (
		fetchJson(comments_url)
		.then(
			comments => (
				{
					html_url,
					title,
					version: getVersionFromComments(comments),
				}
			),
		)
	);
}

function fetchJson(
	url,
) {
	return fetch(url).then(response => response.json());
}

function getVersionFromComments(
	comments,
) {
	return (
		comments.reduce(
			(version, comment) =>
				version
				||
				getVersionFromCommentWhenRelease(comment),
			null,
		)
	);
}

function getVersionFromCommentWhenRelease({
	body,
}) {
	const match = body.match(/^released in \[JavaScript (?<text>(?<major>[0-9]*)\.(?<minor>[0-9]*)\.(?<patch>[0-9]*))/);

	return match && createVersionFromMatchGroups(match.groups);
}

function createVersionFromMatchGroups({
	major,
	minor,
	patch,
	text,
}) {
	return (
		{
			major: Number(major),
			minor: Number(minor),
			patch: Number(patch),
			text,
		}
	);
}

function getReleasesForIssues(
	issues,
) {
	const releasesByVersionText = new Map();

	for (const issue of issues) {
		releasesByVersionText.set(
			issue.version.text,
			{
				issues: getIssuesOfVersion(issue),
				version: issue.version,
			},
		);
	}

	return [ ...releasesByVersionText.values() ];

	function getIssuesOfVersion(
		issue,
	) {
		const release = releasesByVersionText.get(issue.version.text);

		return (
			[
				... (release && release.issues) || [],
				issue,
			]
		);
	}
}

function compareRelease(
	left,
	right,
) {
	return compareVersion(left.version, right.version);
}

function compareVersion(
	left,
	right
) {
	return (
		right.major - left.major
		||
		right.minor - left.minor
		||
		right.patch - left.patch
	);
}

function getHtmlForReleases(
	releases,
) {
	return releases.map(getHtmlForRelease).join("");
}

function getHtmlForRelease({
	issues,
	version
}) {
	return (
		getHtmlForVersion(version)
		+
		issues.map(getHtmlForIssue).join("")
	);
}

function getHtmlForVersion({
	text,
}) {
	return `<h3 id="${text}">${text}</h3>`;
}

function getHtmlForIssue({
	html_url,
	title,
}) {
	return `<div><a href="${html_url}" target="_blank">${title}</a></div>`;
}

function setListHtml(
	html,
) {
	document.getElementById("releases-list").innerHTML = html;
}