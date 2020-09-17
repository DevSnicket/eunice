import updateInHtmlFile from "../../updateInHtmlFile.js";

export default ({
	filePath,
	posts,
}) =>
	updateInHtmlFile({
		filePath,
		replacements: [ {
			content:
				formatLines(
					posts.flatMap(formatPostLines),
				),
			tag:
				"posts",
		} ]
	});

function formatPostLines({
	date,
	imageFileName,
	lines,
	title,
}) {
	return (
		wrapPostContentLines([
			formatHeading({ date, title }),
			...formatImageFileName(imageFileName),
			...lines.map(line => `<p>${line}</p>`),
		])
	);
}

function formatHeading({
	date,
	title,
}) {
	return `<div class="heading" id="${date}"><h2>${title}</h2><span>${date}</span></div>`;
}

function * formatImageFileName(
	fileName,
) {
	if (fileName)
		yield `<a href="${fileName}" target="_blank"><img src="${fileName}"/></a>`;
}

function wrapPostContentLines(
	lines,
) {
	return [
		"<div class=\"post\">",
		...indentLines({
			level: 1,
			lines,
		}),
		"</div>",
	];
}

const indent = "\t";

function formatLines(
	lines,
) {
	return (
		[
			null,
			...indentLines({
				level:
					3,
				lines,
			}),
			null,
		]
		.join("\n")
		+
		formatIndentOfLevel(2)
	);
}

function indentLines({
	level,
	lines,
}) {
	const indent = formatIndentOfLevel(level);

	return lines.map(line => `${indent}${line}`);
}

function formatIndentOfLevel(
	level,
) {
	return "\t".repeat(level);
}