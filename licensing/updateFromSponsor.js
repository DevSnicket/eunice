import fileSystemSync from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { promisify } from "util";
import updateInHtmlFile from "../updateInHtmlFile.js";

const readFile = promisify(fileSystemSync.readFile);

const directoryPath = fileURLToPath(import.meta.url);

(async () =>
	updateInHtmlFile({
		filePath:
			path.join(directoryPath, "..", "index.html"),
		replacements: [
			{
				content:
					getContentFromHtml(
						await readSponsorHtml(),
					),
				tag:
					"sponsorContent"
			},
		],
	})
)();

async function readSponsorHtml() {
	return (
		await readFile(
			path.join(directoryPath, "..", "..", "sponsor", "index.html"),
			"utf-8"
		)
	);
}

function getContentFromHtml(
	html,
) {
	return (
		html
		.match(/(?<=<content.*>)(.|\n)*(?=<\/content>)/)
		[0]
	);
}