// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ copyFile } = require("fs-extra"),
	getSourcePath = require("./getSourcePath"),
	path = require("path");

const fileName = "harness.js.map";

module.exports =
	directory =>
		copyFile(
			getSourcePath(fileName),
			path.join(directory, fileName),
		);