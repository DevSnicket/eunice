export default requestJsonFromUrl =>
	requestIssuesWithVersions(requestJsonFromUrl)
	.then(getHtmlForIssues)

function requestIssuesWithVersions(
	requestJsonFromUrl,
) {
	return (
		requestJsonFromUrl(
			"https://api.github.com/search/issues?q=released%20in%20javascript+repo:devsnicket/eunice+in:comments",
		)
		.then(
			({ items }) =>
				Promise.all(items.map(addVersionToIssue))
		)
	);

	function addVersionToIssue({
		comments_url,
		html_url,
		title,
	}) {
		return (
			requestJsonFromUrl(comments_url)
			.then(
				comments => (
					{
						...getDateAndVersionFromComments(comments),
						html_url,
						title,
					}
				),
			)
		);
	}
}

function getDateAndVersionFromComments(
	comments,
) {
	return (
		comments.reduce(
			(version, comment) =>
				version
				||
				getDateAndVersionFromCommentWhenRelease(comment),
			null,
		)
	);
}

function getHtmlForIssues(
	issues,
) {
	return (
		getHtmlForReleases(
			getReleasesForIssues(issues)
			.sort(compareRelease),
		)
	);
}

function getDateAndVersionFromCommentWhenRelease({
	body,
	updated_at,
}) {
	const match = body.match(/^released in \[JavaScript (([0-9]*)\.([0-9]*)\.([0-9]*))/);

	return (
		match
		&&
		{
			date: updated_at.substring(0, 10),
			version: createVersionFromMatchGroups(match),
		}
	);
}

function createVersionFromMatchGroups([
	,
	text,
	major,
	minor,
	patch,
]) {
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
				date: issue.date,
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
	date,
	issues,
	version
}) {
	return (
		getHtmlForDateAndVersion({ date, version })
		+
		issues.map(getHtmlForIssue).join("")
	);
}

function getHtmlForDateAndVersion({
	date,
	version: { text: version },
}) {
	return `<div class="release"><h3 id="${version}">${version}</h3><span>${date}</span></div>`;
}

function getHtmlForIssue({
	html_url,
	title,
}) {
	return `<div><a href="${html_url}" rel="noopener" target="_blank">${title}</a></div>`;
}