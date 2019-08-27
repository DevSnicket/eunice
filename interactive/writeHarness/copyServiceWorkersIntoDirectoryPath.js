// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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