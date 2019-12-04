// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createAnsiEscapeCodeFormatter = require("./createAnsiEscapeCodeFormatter"),
	{ readFileSync } = require("fs"),
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
		const licenseText = "the license http://www.devsnicket.com/eunice/licensing";

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
				log(`By specifying --${acceptLicenseParameter} you have accepted ${licenseText}`);
				logCommercialUse();

				return true;
			} else
				return false;
		}

		function instructOrPrompt() {
			log(`To use this program you must accept ${licenseText}`);
			logCommercialUse();
			log();

			if (standardInputStream.isTTY)
				return prompt();
			else {
				log(`To accept run again with the --${acceptLicenseParameter} argument.`);

				return false;
			}
		}

		function logCommercialUse() {
			log("Commercial use requires a subscription, visit the page above for more information.");
		}

		function prompt() {
			logPrompt();

			readline.emitKeypressEvents(standardInputStream);
			standardInputStream.setRawMode(true);

			return new Promise(callWithIsAcceptOnKeyPress);

			function callWithIsAcceptOnKeyPress(
				action,
			) {
				standardInputStream.on(
					"keypress",
					onKeyPress,
				);

				function onKeyPress(
					character,
					key,
				) {
					const keyName = getKeyName(key);

					if (keyName === "v")
						view();
					else {
						standardInputStream.setRawMode(false);

						action(keyName === "a");
					}
				}
			}

			function getKeyName({
				ctrl,
				meta,
				name,
			}) {
				return !ctrl && !meta && name;
			}

			function view() {
				logTextFile({
					distSubdirectoryPath,
					log,
				});

				log();

				logPrompt();
			}

			function logPrompt() {
				log(`To accept, press the ${formatBold("A key")} or run again with the ${formatBold(`--${acceptLicenseParameter}`)} argument.`);
				log(`Press the ${formatBold("V key")} to view the license.`);
				log("Any other key will exit without accepting the license.");
			}
		}
	};

function logTextFile({
	distSubdirectoryPath,
	log,
}) {
	log(
		readFileSync(
			path.join(distSubdirectoryPath, "..", "LICENSE"),
			"utf-8",
		),
	);
}