const
	fs = require("fs"),
	path = require("path");

const
	callWhenProcessEntryPoint = require("../../../callWhenProcessEntryPoint"),
	getItemOrItemsFromJavaScript = require("../getItemOrItemsFromJavaScript"),
	getOrCreateFileItem = require("../getOrCreateItemsInDirectory/getOrCreateFileItem"),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWhenProcessEntryPoint({
	action:
		processArguments =>
			getYamlForItemOrItems(
				getOrCreateItemsInDirectory(
					processArguments,
				),
			),
});

module.exports = getOrCreateItemsInDirectory;

function getOrCreateItemsInDirectory({
	directory,
	ignoreDirectoryNames,
}) {
	return (
		getOrCreateItemsInRootedDirectory({
			directory: "",
			ignoreDirectoryNames,
			rootDirectory: directory,
		})
	);
}

function getOrCreateItemsInRootedDirectory({
	directory,
	ignoreDirectoryNames,
	rootDirectory,
}) {
	const subDirectoryFull =
		path.join(rootDirectory, directory);

	return (
		fs.readdirSync(
			subDirectoryFull,
		)
		.reduce(
			(
				items,
				fileOrDirectory,
			) =>
				[
					...items,
					...createItemsFromFileOrSubdirectory(fileOrDirectory) || [],
				],
			[],
		)
		.sort(compareItemIdentifiers)
	);

	function createItemsFromFileOrSubdirectory(
		fileOrSubdirectory,
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
						directory,
						filePath:
							fileOrSubdirectoryPath,
						items:
							ensureArray(
								getItemOrItemsFromJavaScript(
									readFile(),
								),
							),
						name:
							fileOrSubdirectoryPath.name,
					}),
				]
			);

			function isJavaScript() {
				return fileOrSubdirectoryPath.ext === ".js";
			}

			function readFile() {
				return (
					fs.readFileSync(
						getFileOrSubdirectoryFull(),
						"utf-8",
					)
				);
			}
		}

		function createItemsWhenSubdirectory() {
			return (
				isDirectory()
				&&
				!isIgnored()
				&&
				getOrCreateItemsInRootedDirectory({
					directory: path.join(directory, fileOrSubdirectory),
					ignoreDirectoryNames,
					rootDirectory,
				})
			);

			function isIgnored() {
				return (
					ignoreDirectoryNames
					&&
					ignoreDirectoryNames.includes(fileOrSubdirectory)
				);
			}

			function isDirectory() {
				return (
					fs.lstatSync(
						getFileOrSubdirectoryFull(),
					)
					.isDirectory()
				);
			}
		}

		function getFileOrSubdirectoryFull() {
			return (
				path.join(
					subDirectoryFull,
					fileOrSubdirectory,
				)
			);
		}
	}
}

function ensureArray(
	objectOrArray,
) {
	return (
		Array.isArray(objectOrArray)
		?
		objectOrArray
		:
		objectOrArray && [ objectOrArray ]
	);
}

function compareItemIdentifiers(
	left,
	right,
) {
	const
		leftIdentifier = getIdentifier(left),
		rightIdentifier = getIdentifier(right);

	return (
		leftIdentifier !== rightIdentifier
		&&
		(leftIdentifier < rightIdentifier ? -1 : 1)
	);

	function getIdentifier(
		item,
	) {
		return (
			(item.id || item)
			.replace(/\//g, String.fromCharCode(0))
		);
	}
}