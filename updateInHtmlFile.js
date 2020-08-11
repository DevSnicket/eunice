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
	content,
	filePath,
	tag,
}) => {
	await writeTextFile(
		filePath,
		updateHtml(await readTextFile(filePath)),
	);

	function updateHtml(
		html,
	) {
		return (
			html
			.replace(
				new RegExp(`(?<=<${tag}.*>).*(?=<\/${tag}>)`),
				content,
			)
		);
	}
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