import fileSystemSync from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { promisify } from "util";
import updateInHtmlFile from "../updateInHtmlFile.js";

const
	fileSystem =
		{
			readdir: promisify(fileSystemSync.readdir),
			readFile: promisify(fileSystemSync.readFile),
		},
	moduleRelativePath = 
		path.join(fileURLToPath(import.meta.url), "..");

(async () => {
	await updateInHtmlFile({
		filePath:
			path.join(moduleRelativePath, "index.html"),
		replacements: [ {
			content:
				await formatPosts(),
			tag:
				"posts",
		} ]
	});
})();

async function formatPosts() {
	return (
		formatLines(
			await readAndFormatPostLinesFromFileNames(
				await fileSystem.readdir(
					moduleRelativePath,
				)
			)
		)
	);
}

async function readAndFormatPostLinesFromFileNames(
	fileNames,
) {
	return (
		(
			await Promise.all(
				fileNames.flatMap(getDateWhenPostTextFileName)
				.sort()
				.reverse()
				.map(readAndFormatPostLinesWithDate),
			)
		)
		.flat()
	);
}

function getDateWhenPostTextFileName(
	fileName,
) {
	return (
		fileName.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}(?=\.txt)/)
		||
		[]
	);
}

async function readAndFormatPostLinesWithDate(
	date,
) {
	return (
		wrapPostContentLines(
			formatPostContentLines({
				date,
				...getTitleAndLinesFromPostText(
					await readPostText(),
				)
			})
		)
	);

	function readPostText() {
		return (
			fileSystem.readFile(
				path.join(moduleRelativePath, `${date}.txt`),
				"utf-8"
			)
		);
	}
}

function getTitleAndLinesFromPostText(
	text,
) {
	const [title, ...lines] = text.split("\n");

	return { lines, title };
}

function formatPostContentLines({
	date,
	lines,
	title,
}) {
	return [
		formatHeading({ date, title }),
		...formatImageWhenFileNameExists(`${date}.png`),
		...lines.map(line => `<p>${replaceGithubIssuesWithLinks(line)}</p>`),
	];
}

function formatHeading({
	date,
	title,
}) {
	return `<div class="heading" id="${date}"><h2>${title}</h2><span>${date}</span></div>`;
}

function * formatImageWhenFileNameExists(
	fileName,
) {
	if (imageFileExists())
		yield `<a href="${fileName}" target="_blank"><img src="${fileName}"/></a>`;

	function imageFileExists() {
		return (
			fileSystemSync.existsSync(
				path.join(moduleRelativePath, fileName),
			)
		);
	}
}

function replaceGithubIssuesWithLinks(
	text,
) {
	return (
		text.replace(
			/#([0-9]+)/g,
			"<a href=\"https://github.com/DevSnicket/eunice/issues/$1\" rel=\"noopener\" target=\"_blank\">$&</a>",
		)
	);
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