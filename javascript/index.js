/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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
		console.log(error);
	}

	// Process exit required as this is a top-level promise
	// eslint-disable-next-line no-process-exit
	process.exit();
})();