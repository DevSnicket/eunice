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
		getItemOrCreateFileItem(
			getItemOrItemsFromJavaScript(
				readFile()
			)
		)
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

	function getItemOrCreateFileItem(
		itemOrItems
	) {
		return (
			isItemWithFileIdentifier()
			?
			itemOrItems
			:
			createFileItem()
		);

		function isItemWithFileIdentifier() {
			return (
				itemOrItems
				&&
				[ itemOrItems, itemOrItems.id ]
				.includes(fileOrDirectoryPath.name)
			);
		}

		function createFileItem() {
			return (
				itemOrItems
				?
				{
					id: fileOrDirectoryPath.name,
					items: itemOrItems,
				}
				:
				fileOrDirectoryPath.name
			);
		}
	}
}