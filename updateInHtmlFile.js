import fileSystemSync from "fs";
import { promisify } from "util";

const
	encoding = "utf-8",
	fileSystem =
		{
			readFile: promisify(fileSystemSync.readFile),
			writeFile: promisify(fileSystemSync.writeFile),
		};

export default async ({
	filePath,
	replacements,
}) => {
	await writeTextFile(
		filePath,
		updateHtml({
			html: await readTextFile(filePath),
			replacements,
		}),
	);
}

function readTextFile(
	filePath,
) {
	return (
		fileSystem.readFile(
			filePath,
			encoding,
		)
	);
}

function updateHtml({
	html,
	replacements,
}) {
	return (
		replacements
		.reduce(
			applyReplacementToHtml,
			html,
		)
	);
}

function applyReplacementToHtml(
	html,
	{ content, tag },
) {
	return (
		html
		.replace(
			new RegExp(`(?<=<${tag}.*>).*(?=<\/${tag}>)`),
			content,
		)
	);
}

async function writeTextFile(
	filePath,
	text,
) {
	await fileSystem.writeFile(
		filePath,
		text,
		encoding,
	);
}