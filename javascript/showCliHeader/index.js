// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

module.exports =
	({
		distSubdirectoryPath,
		isBrightSupported,
		log,
		version,
	}) => {
		log();
		log(formatBright(`Eunice Community/Trial Edition (${version})`));
		log();
		log("By using this program you are agreeing to its license:");
		log(`\t${path.join(distSubdirectoryPath, "..", "LICENSE")}`);
		log("\thttp://www.devsnicket.com/eunice/licensing/community-trial.txt");

		function formatBright(
			value,
		) {
			return whenTextTerminal() || value;

			function whenTextTerminal() {
				return (
					isBrightSupported
					&&
					`\x1b[1m${value}\x1b[0m`
				);
			}
		}
	};