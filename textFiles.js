import fileSystem from "fs";

const encoding = "utf-8";

export function updateInHtmlIndexFile({
	content,
	tag,
}) {
	const pageFilePath = "./index.html";

	readTextFile(
		pageFilePath,
		pageHtml =>
			fileSystem.writeFileSync(
				pageFilePath,
				pageHtml.replace(
					new RegExp(`(?<=<${tag} id=".*">).*(?=<\/${tag}>)`),
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