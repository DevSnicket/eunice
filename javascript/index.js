// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

/* istanbul ignore file: test would be a mirror of implementation */

const
	analyzeAndProcessAndRender = require("./analyzeAndProcessAndRender"),
	createParameterFromCliArguments = require("./createParameterFromCliArguments"),
	getOrPromptForLicenseAcceptance = require("./getOrPromptForLicenseAcceptance"),
	minimist = require("minimist"),
	supportsColor = require("supports-color"),
	{ version } = require("./package.json");

const processArguments =
	minimist(
		process.argv.slice(2),
	);

(async() => {
	if (await isLicenseAccepted()) {
		console.log();
		console.log("Analyzing...");

		await analyzeAndProcessAndRender({
			...createParameterFromCliArguments(processArguments),
			date: Date.now(),
			version,
		});
	}

	// Process exit required because license acceptance puts standard input into raw mode.
	// eslint-disable-next-line no-process-exit
	process.exit();
})();

function isLicenseAccepted() {
	return (
		getOrPromptForLicenseAcceptance({
			distSubdirectoryPath: __dirname,
			isColorSupported: supportsColor.stdout,
			log: console.log,
			processArguments,
			standardInputStream: process.stdin,
			version,
		})
	);
}