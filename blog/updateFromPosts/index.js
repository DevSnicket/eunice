import { fileURLToPath } from "url";
import path from "path";
import updateLatestPostInHtmlFile from "./updateLatestPostInHtmlFile.js";
import readPostsInDirectoryPath from "./readPostsInDirectoryPath.js";
import updatePostsInHtmlFile from "./updatePostsInHtmlFile.js";
import updatePostsInRssFile from "./updatePostsInRssFile.js";

updatePostsInDirectoryPath(
	path.join(
		fileURLToPath(import.meta.url),
		"..",
		"..",
	),
);

async function updatePostsInDirectoryPath(
	directoryPath,
) {
	const posts =
		await readPostsInDirectoryPath(
			directoryPath,
		);

	await updateLatestPostInHtmlFile({
		filePath:
			path.join(directoryPath, "..", "index.html"),
		post:
			posts[0],
	});

	await updatePostsInHtmlFile({
		filePath:
			path.join(directoryPath, "index.html"),
		posts,
	});

	await updatePostsInRssFile({
		filePath:
			path.join(directoryPath, "feed.rss"),
		posts,
	});
}