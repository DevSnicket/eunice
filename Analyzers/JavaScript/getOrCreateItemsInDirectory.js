const
	fs = require("fs"),
	path = require("path");

const
	getItemOrItemsFromJavaScript = require("./getItemOrItemsFromJavaScript"),
	getOrCreateFileItem = require("./getItemsInDirectory/getOrCreateFileItem");

module.exports =
	directory =>
		getOrCreateItemsInRootedDirectory({
			directory: ".",
			rootDirectory: directory,
		});

function getOrCreateItemsInRootedDirectory({
	directory,
	rootDirectory,
}) {
	const subDirectoryFull =
		path.join(rootDirectory, directory);

	return (
		fs.readdirSync(
			subDirectoryFull
		)
		.reduce(
			(
				items,
				fileOrDirectory
			) =>
				[
					...items,
					...createItemsFromFileOrSubdirectory(fileOrDirectory) || [],
				],
			[]
		)
	);

	function createItemsFromFileOrSubdirectory(
		fileOrSubdirectory
	) {
		return (
			getOrCreateItemsWhenJavaScriptFile()
			||
			createItemsWhenSubdirectory()
		);

		function getOrCreateItemsWhenJavaScriptFile() {
			const fileOrSubdirectoryPath =
				path.parse(fileOrSubdirectory);

			return (
				isJavaScript()
				&&
				[
					getOrCreateFileItem({
						identifier:
							getIdentifier(),
						items:
							ensureArray(
								getItemOrItemsFromJavaScript(
									readFile()
								)
							),
						name:
							fileOrSubdirectoryPath.name,
					}),
				]
			);

			function isJavaScript() {
				return fileOrSubdirectoryPath.ext === ".js";
			}

			function getIdentifier() {
				return `${directory}/${path.join(fileOrSubdirectoryPath.dir, fileOrSubdirectoryPath.name)}`;
			}

			function readFile() {
				return (
					fs.readFileSync(
						getFileOrSubdirectoryFull(),
						"utf-8"
					)
				);
			}
		}

		function createItemsWhenSubdirectory() {
			return (
				isDirectory()
				&&
				getOrCreateItemsInRootedDirectory({
					directory: `${directory}/${fileOrSubdirectory}`,
					rootDirectory,
				})
			);

			function isDirectory() {
				return (
					fs.lstatSync(
						getFileOrSubdirectoryFull()
					)
					.isDirectory()
				);
			}
		}

		function getFileOrSubdirectoryFull() {
			return (
				path.join(
					subDirectoryFull,
					fileOrSubdirectory
				)
			);
		}
	}
}

function ensureArray(
	objectOrArray
) {
	return (
		Array.isArray(objectOrArray)
		?
		objectOrArray
		:
		objectOrArray && [ objectOrArray ]
	);
}