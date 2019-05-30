const
	fs = require("fs-extra"),
	getSourcePath = require("./getSourcePath"),
	path = require("path");

const fileName = "harness.js.map";

module.exports =
	directory =>
		fs.copyFile(
			getSourcePath(fileName),
			path.join(directory, fileName),
		);