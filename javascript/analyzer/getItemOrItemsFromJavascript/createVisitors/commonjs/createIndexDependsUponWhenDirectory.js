// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	fs = require("fs"),
	path = require("path");

module.exports =
	({
		directoryAbsolutePath,
		fileOrDirectoryPath,
		items,
	}) => {
		return whenIsDirectory() || items;

		function whenIsDirectory() {
			return (
				fileOrDirectoryPath
				&&
				fileOrDirectoryPath[0] === "."
				&&
				isDirectory()
				&&
				addParent({
					identifier: "index",
					items,
				})
			);

			function isDirectory() {
				return (
					directoryAbsolutePath
					&&
					directoryExists(
						path.join(
							directoryAbsolutePath,
							fileOrDirectoryPath,
						),
					)
				);
			}
		}
	};

function directoryExists(
	directoryPath,
) {
	return (
		fs.existsSync(directoryPath)
		&&
		fs.lstatSync(directoryPath)
		.isDirectory()
	);
}

function addParent({
	identifier,
	items,
}) {
	return whenHasItems() || identifier;

	function whenHasItems() {
		return (
			items
			&&
			{ id: identifier, items }
		);
	}
}