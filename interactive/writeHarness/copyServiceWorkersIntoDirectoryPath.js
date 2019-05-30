const
	fs = require("fs-extra"),
	getSourcePath = require("./getSourcePath"),
	path = require("path");

const directoryName = "monaco-editor";

module.exports =
	directory =>
		fs.copy(
			getSourcePath(directoryName),
			path.join(directory, directoryName),
		);