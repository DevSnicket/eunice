import { promisify } from "util";
import fileSystemSync from "fs";
import formatImageUrlAsHtml from "./formatImageUrlAsHtml.js";
import formatLinesAsHtml from "./formatLinesAsHtml.js";

const fileSystem = { writeFile: promisify(fileSystemSync.writeFile) };

export default ({
	filePath,
	posts,
}) =>
	fileSystem.writeFile(
		filePath,
		formatItems(
			posts.map(formatPostAsItem),
		),
	);

function formatPostAsItem(
	post,
) {
	return (
		formatItem({
			description: formatDescription(post),
			...post,
		})
	);
}

const siteUrl = "https://devsnicket.com/eunice";

function formatDescription({
	imageFileName,
	lines,
}) {
	return (
		[
			...formatImageHtml(),
			...formatLinesAsHtml(lines),
		]
		.join("")
	);

	function * formatImageHtml() {
		if (imageFileName)
			yield formatImageUrlAsHtml(`${siteUrl}/blog/${imageFileName}`);
	}
}

function formatItem({
	date,
	description,
	title,
}) {
	return `<item><title>${title}</title><pubDate>${date}</pubDate><description><![CDATA[ ${description} ]]></description></item>`;
}

function formatItems(
	items,
) {
	return `<?xml version="1.0"?><rss><channel><link>${siteUrl}</link><title>Eunice from devsnicket.com</title>${items.join("")}</channel></rss>`;
}
