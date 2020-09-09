import createMenuReplacement from "./createMenuReplacement.js";
import fileSystemSync from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { promisify } from "util";
import updateInHtmlFile from "../updateInHtmlFile.js";

const
	fileSystem =
		{
			readdir: promisify(fileSystemSync.readdir),
			readFile: promisify(fileSystemSync.readFile),
			stat: promisify(fileSystemSync.stat),
		};

(async () =>
	withFooterReplacement(
		{
			content:
				await fileSystem.readFile(
					path.join(fileURLToPath(import.meta.url), "..", "footer.html"),
					"utf-8"),
			tag:
				"footer",
		},
	)
	.updateInDirectory({
		directoryPath: ".",
		rootPath: "./",
	})
)();

function withFooterReplacement(
	footerReplacement,
) {
	return { updateInDirectory };

	async function updateInDirectory({
		directoryPath,
		rootPath,
	}) {
		const filesAndDirectories =
			await fileSystem.readdir(directoryPath);

		await Promise.all(
			[
				whenContainsHtmlFile(),
				...filesAndDirectories.map(whenSubdirectory),
			]
		);

		async function whenContainsHtmlFile() {
			const fileName = "index.html";

			if (filesAndDirectories.includes(fileName))
				updateInHtmlFile({
					filePath:
						path.join(directoryPath, fileName),
					replacements: [
						footerReplacement,
						createMenuReplacement({
							directoryPath,
							rootPath,
						}),
					],
				});
		}

		async function whenSubdirectory(
			fileOrDirectory,
		) {
			await whenSubdirectoryPath(
				path.join(directoryPath, fileOrDirectory),
			);
		}
	}

	async function whenSubdirectoryPath(
		fileOrDirectoryPath,
	) {
		if (await isDirectoryPath() && !isEuniceInteractiveOrTestHarness())
			await updateInDirectory({
				directoryPath:
					fileOrDirectoryPath,
				rootPath:
					formatRootPath(),
			});

		async function isDirectoryPath() {
			return (
				(await fileSystem.stat(fileOrDirectoryPath))
				.isDirectory()
			);
		}

		function isEuniceInteractiveOrTestHarness() {
			return (
				[
					".git",
					"dogfooding",
					"interactive",
					path.join("javascript", "analyzer-harness"),
					path.join("javascript", "harness"),
				]
				.includes(fileOrDirectoryPath)
			);
		}

		function formatRootPath() {
			return "../".repeat(getLevelCount());

			function getLevelCount() {
				return (
					fileOrDirectoryPath
					.split(path.sep)
					.length
				);
			}
		}
	}
}