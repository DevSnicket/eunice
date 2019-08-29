// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

/* istanbul ignore file: test would be a mirror of implementation */

const
	analyzeAndProcessAndRender = require("./analyzeAndProcessAndRender"),
	createParameterFromCliArguments = require("./createParameterFromCliArguments"),
	minimist = require("minimist"),
	path = require("path"),
	{ version } = require("./package.json");

console.log();
console.log(`\x1b[1mEunice Community/Trial Edition (${version})\x1b[0m`);
console.log();
console.log("By using this program you are agreeing to its license:");
console.log(`\t${path.join(__dirname, "LICENSE")}`);
console.log("\thttp://www.devsnicket.com/eunice/licensing/community-trial.txt");
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