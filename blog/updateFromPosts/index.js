import { fileURLToPath } from "url";
import path from "path";
import readPostsInDirectoryPath from "./readPostsInDirectoryPath.js";
import updatePostsInHtmlFile from "./updatePostsInHtmlFile.js";

(async () => {
	const postsDirectoryPath =
		path.join(
			fileURLToPath(import.meta.url),
			"..",
			"..",
		);

	await updatePostsInHtmlFile({
		filePath:
			path.join(postsDirectoryPath, "index.html"),
		posts:
			await readPostsInDirectoryPath(
				postsDirectoryPath,
			),
	});
})();