const
	fs = require("fs"),
	path = require("path");

const
	getItemOrItemsFromJavaScript = require("./getItemOrItemsFromJavaScript");

module.exports =
	directory =>
		fs.readdirSync(
			directory
		)
		.reduce(
			(
				items,
				fileOrDirectory
			) =>
				[
					...items,
					...getItemsFromFilePathWhenJavaScript(path.join(directory, fileOrDirectory)) || [],
				],
			[]
		);

function getItemsFromFilePathWhenJavaScript(
	filePath
) {
	return (
		isJavaScript()
		&&
		ensureInArrayWhenHasValue(
			getItemOrItemsFromJavaScript(
				readFile()
			)
		)
	);

	function isJavaScript() {
		return path.extname(filePath) === ".js";
	}

	function readFile() {
		return (
			fs.readFileSync(
				filePath,
				"utf-8"
			)
		);
	}
}

function ensureInArrayWhenHasValue(
	objectOrArray
) {
	return objectOrArray && ensureInArray();

	function ensureInArray() {
		return (
			Array.isArray(objectOrArray)
			?
			objectOrArray
			:
			[ objectOrArray ]
		);
	}
}