// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createAnsiEscapeCodeFormatter = require("./createAnsiEscapeCodeFormatter"),
	path = require("path"),
	readline = require("readline");

module.exports =
	({
		distSubdirectoryPath,
		isColorSupported,
		log,
		processArguments,
		standardInputStream,
		version,
	}) => {
		const
			acceptLicenseParameter = "accept-license",
			{
				formatBold,
				formatGreen,
				formatRed,
			} = createAnsiEscapeCodeFormatter({ isColorSupported });

		log();
		log(
			formatRed("e")
			+
			formatGreen("uni")
			+
			formatRed("ce")
			+
			formatBold(` ${version}`),
		);
		log();

		return (
			whenAcceptedInProcessArguments()
			||
			instructOrPrompt()
		);

		function whenAcceptedInProcessArguments() {
			if (processArguments[acceptLicenseParameter]) {
				log(`By specifying the --${acceptLicenseParameter} argument you have accepted ${getLicenseFilePaths()}.`);
				logCommercialUse();

				return true;
			} else
				return false;
		}

		function instructOrPrompt() {
			log(`To use this program you must accept ${getLicenseFilePaths()}.`);
			logCommercialUse();
			log();

			if (standardInputStream.isTTY)
				return prompt();
			else {
				log(`To accept run again with the --${acceptLicenseParameter} argument.`);

				return false;
			}
		}

		function getLicenseFilePaths() {
			return `the license from http://www.devsnicket.com/eunice/licensing or ${path.join(distSubdirectoryPath, "..", "LICENSE")}`;
		}

		function logCommercialUse() {
			log("For commercial use beyond the evaluation period (as defined in the license) visit the web page above.");
		}

		function prompt() {
			log(`To accept, press the ${formatBold("A key")} or run again with the ${formatBold(`--${acceptLicenseParameter}`)} argument. Any other key will exit without accepting the license.`);

			readline.emitKeypressEvents(standardInputStream);
			standardInputStream.setRawMode(true);

			return new Promise(callWithIsAcceptOnKeyPress);

			function callWithIsAcceptOnKeyPress(
				action,
			) {
				standardInputStream.on(
					"keypress",
					(character, key) => action(isAcceptKey(key)),
				);
			}

			function isAcceptKey({
				ctrl,
				meta,
				name,
			}) {
				return !ctrl && !meta && name === "a";
			}
		}
	};