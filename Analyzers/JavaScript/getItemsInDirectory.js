const
	fs = require("fs"),
	path = require("path");

const
	getItemOrItemsFromJavaScript = require("./getItemOrItemsFromJavaScript"),
	getOrCreateFileItem = require("./getItemsInDirectory/getOrCreateFileItem");

module.exports =
	directory =>
		fs.readdirSync(
			directory
		)
		.reduce(
			(
				items,
				fileOrDirectory
			) => {
				const item =
					createItemFromPathWhenJavaScriptFile({
						fileOrDirectory,
						rootDirectory: directory,
					});

				return item ? [ ...items, item ] : items;
			},
			[]
		);

function createItemFromPathWhenJavaScriptFile({
	fileOrDirectory,
	rootDirectory,
}) {
	const fileOrDirectoryPath = path.parse(fileOrDirectory);

	return (
		isJavaScript()
		&&
		getOrCreateFileItem({
			directory:
				fileOrDirectoryPath.dir,
			items:
				ensureArray(
					getItemOrItemsFromJavaScript(
						readFile()
					)
				),
			name:
				fileOrDirectoryPath.name,
		})
	);

	function isJavaScript() {
		return fileOrDirectoryPath.ext === ".js";
	}

	function readFile() {
		return (
			fs.readFileSync(
				path.join(rootDirectory, fileOrDirectory),
				"utf-8"
			)
		);
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