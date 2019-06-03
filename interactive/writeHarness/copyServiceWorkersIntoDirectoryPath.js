const
	{ copy } = require("fs-extra"),
	getSourcePath = require("./getSourcePath"),
	path = require("path");

const directoryName = "monaco-editor";

module.exports =
	directory =>
		copy(
			getSourcePath(directoryName),
			path.join(directory, directoryName),
		);