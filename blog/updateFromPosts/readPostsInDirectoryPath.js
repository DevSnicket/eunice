import fileSystemSync from "fs";
import path from "path";
import { promisify } from "util";

const
	fileSystem =
		{
			readdir: promisify(fileSystemSync.readdir),
			readFile: promisify(fileSystemSync.readFile),
		};

export default
async directoryPath => {
	return (
		Promise.all(
			getPostDatesFromFileNames(
				await fileSystem.readdir(directoryPath),
			)
			.map(readPostWithDate),
		)
	);

	async function readPostWithDate(
		date,
	) {
		return {
			date,
			imageFileName:
				getImageFileNameWhenExists(),
			...getTitleAndLinesFromPostText(
				await readPostText(),
			)
		};

		function getImageFileNameWhenExists() {
			const fileName = `${date}.png`;

			return exists() && fileName;

			function exists() {
				return (
					fileSystemSync.existsSync(
						path.join(directoryPath, fileName),
					)
				);
			}
		}

		function readPostText() {
			return (
				fileSystem.readFile(
					path.join(directoryPath, `${date}.txt`),
					"utf-8"
				)
			);
		}
	}
}

function getPostDatesFromFileNames(
	fileNames,
) {
	return (
		fileNames.flatMap(getDateWhenPostTextFileName)
		.sort()
		.reverse()
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

function getTitleAndLinesFromPostText(
	text,
) {
	const [title, ...lines] = text.split("\n");

	return {
		lines:
			lines.map(formatText),
		title:
			escapeXmlContent(title),
	};
}

function formatText(
	text,
) {
	return (
		replaceGithubIssuesWithLinks(
			escapeXmlContent(
				text,
			),
		)
	);
}

function escapeXmlContent(
	text,
) {
	return (
		text.replace(
			/[<>&]/g,
			character => {
				switch (character) {
					case '<': return '&lt;';
					case '>': return '&gt;';
					case '&': return '&amp;';
				}
			}
		)
	);
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