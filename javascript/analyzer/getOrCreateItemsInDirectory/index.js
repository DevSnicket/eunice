const
	fs = require("fs"),
	getItemOrItemsFromJavaScript = require("../getItemOrItemsFromJavaScript"),
	getOrCreateFileItem = require("./getOrCreateFileItem"),
	path = require("path");

module.exports =
	({
		directory,
		ignoreDirectoryNames = null,
	}) =>
		getOrCreateItemsInRootedDirectory({
			directory: "",
			ignoreDirectoryNames,
			rootDirectory: directory,
		});

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
						itemOrItems:
							getItemOrItemsFromJavaScriptOrRethrowErrorWithPath(
								readFile(),
							),
					}),
				]
			);

			function isJavaScript() {
				return fileOrSubdirectoryPath.ext === ".js";
			}

			function getItemOrItemsFromJavaScriptOrRethrowErrorWithPath(
				javaScript,
			) {
				try {
					return getItemOrItemsFromJavaScript(javaScript);
				} catch (error) {
					throw new Error(`Analysis of file "${path.join(directory, fileOrSubdirectory)}" raised the following error.\n\n${error.message}`);
				}
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