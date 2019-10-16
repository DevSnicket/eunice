// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

/* istanbul ignore file: test would be a mirror of implementation */

const
	analyzeAndProcessAndRender = require("./analyzeAndProcessAndRender"),
	createParameterFromCliArguments = require("./createParameterFromCliArguments"),
	getOrPromptForLicenseAcceptance = require("./getOrPromptForLicenseAcceptance"),
	minimist = require("minimist"),
	path = require("path"),
	supportsColor = require("supports-color"),
	{ version } = require("./package.json");

const cliArguments =
	minimist(
		process.argv.slice(2),
	);

(async() => {
	try {
		if (await isLicenseAccepted()) {
			console.log();
			console.log("Analyzing...");

			await analyzeAndProcessAndRender({
				...createParameterFromCliArguments({
					cliArguments,
					pathSeparator: path.sep,
				}),
				date: Date.now(),
				version,
			});
		}
	} catch (error) {
		console.log(error);
	}

	// Process exit required as this is a top-level promise
	// eslint-disable-next-line no-process-exit
	process.exit();
})();

function isLicenseAccepted() {
	return (
		getOrPromptForLicenseAcceptance({
			distSubdirectoryPath: __dirname,
			isColorSupported: supportsColor.stdout,
			log: console.log,
			processArguments: cliArguments,
			standardInputStream: process.stdin,
			version,
		})
	);
}