// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	path = require("path"),
	readTextFile = require("./readTextFile");

module.exports =
	directoryName =>
		readFromPath(
			path.join(__dirname, "..", "test-cases", directoryName),
		);

async function readFromPath(
	directoryPath,
) {
	return (
		{
			javascript: await readFileWithExtension("js"),
			yaml: await readFileWithExtension("yaml"),
		}
	);

	function readFileWithExtension(
		extension,
	) {
		return readTextFile(path.join(directoryPath, `.${extension}`));
	}
}