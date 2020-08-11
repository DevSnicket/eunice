import fileSystemSync from "fs";
import path from "path";
import { promisify } from "util";
import updateInHtmlFile from "./updateInHtmlFile.js";

const
	fileSystem =
		{
			readdir: promisify(fileSystemSync.readdir),
			stat: promisify(fileSystemSync.stat),
		};

inDirectory({
	directoryPath: ".",
	rootPath: "./",
});

async function inDirectory({
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
				content:
					formatMenuHtml({
						directoryPath,
						rootPath,
					}),
				filePath:
					path.join(directoryPath, fileName),
				tag:
					"menu",
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

function formatMenuHtml({
	directoryPath,
	rootPath,
}) {
	return (
		[
			formatRoot(),
			...formatDirectories(),
		]
		.join("")
	);

	function formatRoot() {
		return (
			formatMenuItemHtml({
				directories:
					[ "." ],
				href:
					rootPath.slice(0, -1),
				title:
					"intro",
			})
		);
	}

	function formatDirectories() {
		return (
			[
				{
					directory: "how-it-works",
					redirectDirectories: [ "advanced", "dependencies", "structure" ],
				},
				{ directory: "case-studies" },
				{
					directory: "languages",
					redirectDirectories: [ "csharp", "dotnet", "javascript" ],
				},
				{ directory: "issues" },
				{
					directory: "licensing",
					title: "sponsor",
				},
			]
			.map(formatDirectory)
		);

		function formatDirectory({
			directory,
			redirectDirectories = [],
			title = directory.replace(/-/g, " "),
		}) {
			return (
				formatMenuItemHtml({
					directories:
						[ directory, ...redirectDirectories ],
					href:
						`${rootPath}${directory}`,
					title,
				})
			);
		}
	}

	function formatMenuItemHtml({
		directories,
		href,
		title,
	}) {
		return `<a ${formatClassAttribute()}href="${href}">${title}</a>`;

		function formatClassAttribute() {
			return whenCurrent() || "";

			function whenCurrent() {
				return (
					isCurrent()
					&&
					`class="current" `
				);

				function isCurrent() {
					return (
						directories.some(
							directory => directoryPath.startsWith(directory)
						)
					);
				}
			}
		}
	}
}

async function whenSubdirectoryPath(
	fileOrDirectoryPath,
) {
	if (await isDirectoryPath() && !isEuniceInteractiveOrTestHarness())
		await inDirectory({
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