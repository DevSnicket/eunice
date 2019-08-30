// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

/* istanbul ignore file: test would be a mirror of implementation */

const
	analyzeAndProcessAndRender = require("./analyzeAndProcessAndRender"),
	createParameterFromCliArguments = require("./createParameterFromCliArguments"),
	minimist = require("minimist"),
	showCliHeader = require("./showCliHeader"),
	supportsColor = require("supports-color"),
	{ version } = require("./package.json");

showCliHeader({
	distSubdirectoryPath: __dirname,
	isBrightSupported: supportsColor.stdout,
	log: console.log,
	version,
});

console.log();
console.log("Analyzing...");

analyzeAndProcessAndRender({
	...createParameterFromCliArguments(
		minimist(
			process.argv.slice(2),
		),
	),
	date: Date.now(),
	version,
});