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

const
	siteUrl = "https://devsnicket.com/eunice",
	blogUrl = `${siteUrl}/blog`;

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
			yield formatImageUrlAsHtml(`${blogUrl}/${imageFileName}`);
	}
}

function formatItem({
	date,
	description,
	title,
}) {
	const postUrl = `${blogUrl}#${date}`;

	return `<item><description><![CDATA[ ${description} ]]></description><guid>${postUrl}</guid><link>${postUrl}</link><pubDate>${new Date(date).toUTCString()}</pubDate><title>${title}</title></item>`;
}

function formatItems(
	items,
) {
	const linkAndTitle = `<link>${siteUrl}</link><title>eunice devsnicket.com</title>`;

	return `<?xml version="1.0"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><atom:link href="${blogUrl}/feed.rss" rel="self" type="application/rss+xml" /><description>blog on eunice recent developments, potential future direction and my thoughts on related concepts</description><image>${linkAndTitle}<url>${blogUrl}/feed.png</url></image>${linkAndTitle}${items.join("")}</channel></rss>`;
}