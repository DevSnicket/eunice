// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// istanbul ignore file: test would be a mirror of implementation

/* eslint-disable no-console */

// index.js is separate to bin.js so WebPack doesn't need to ignore Node.js shebang

import analyzeAndProcessAndRender from "./analyzeAndProcessAndRender";
import createParameterFromCliArguments from "./createParameterFromCliArguments";
import minimist from "minimist";
import path from "path";
import supportsColor from "supports-color";
import { version } from "./package.json";
import writeNameAndVersion from "./writeNameAndVersion";

const cliArguments =
	minimist(
		process.argv.slice(2),
	);

(async() => {
	try {
		writeNameAndVersion({
			isColorSupported: supportsColor.stdout,
			log: console.log,
			version,
		});

		await analyzeAndProcessAndRender({
			...createParameterFromCliArguments({
				cliArguments,
				pathSeparator: path.sep,
			}),
			date: Date.now(),
			version,
		});
	} catch (error) {
		console.log(error.message);
	}

	// Process exit required as this is a top-level promise
	// eslint-disable-next-line no-process-exit
	process.exit();
})();