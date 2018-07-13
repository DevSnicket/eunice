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
		getItemOrCreateFileItem({
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

function getItemOrCreateFileItem({
	directory,
	items,
	name,
}) {
	return (
		(!items && getIdentifier())
		||
		(items.length === 1 && getFromItem(items[0]))
		||
		createFileItem()
	);

	function getFromItem(
		item
	) {
		return (
			getIdentifierWhenFileName()
			||
			createWhenString()
			||
			resolveWhenSameNameAsFile()
			||
			resolveAndIdentifyAsFileWhenAnonymous()
		);

		function getIdentifierWhenFileName() {
			return (
				item === name
				&&
				getIdentifier()
			);
		}

		function createWhenString() {
			return (
				typeof item === "string"
				&&
				{
					id: getIdentifier(),
					items: item,
				}
			);
		}

		function resolveWhenSameNameAsFile() {
			return (
				item.id === name
				&&
				item
			);
		}

		function resolveAndIdentifyAsFileWhenAnonymous() {
			return (
				!item.id
				&&
				{
					id: getIdentifier(),
					...item,
				}
			);
		}
	}

	function createFileItem() {
		return (
			{
				id: getIdentifier(),
				items,
			}
		);
	}

	function getIdentifier() {
		return `./${path.join(directory, name)}`;
	}
}