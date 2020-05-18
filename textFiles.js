import fileSystem from "fs";

const encoding = "utf-8";

export function updateParagraphInHtmlIndexFile({
	content,
	paragraphIdentifier,
}) {
	const pageFilePath = "./index.html";

	readTextFile(
		pageFilePath,
		pageHtml =>
			fileSystem.writeFileSync(
				pageFilePath,
				pageHtml.replace(
					new RegExp(`(?<=<p id="${paragraphIdentifier}">).*(?=<\/p>)`),
					content,
				),
				encoding,
			),
	);
}

export function readTextFile(
	filePath,
	callback,
) {
	fileSystem.readFile(
		filePath,
		encoding,
		(error, log) => {
			if (error)
				throw error;
			else
				callback(log);
		}
	);
}