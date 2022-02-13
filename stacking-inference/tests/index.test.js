/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { createStackFromYaml, createYamlFromStack } from "../../dependency-and-structure";
import { safeDump as formatYaml, safeLoad as parseYaml } from "js-yaml";

import inferLevelsInStack from "..";
import path from "path";
import runTestsFromFileSystem from "../../run-tests-from-file-system";

runTestsFromFileSystem({
	caseFileName:
		"source.yaml",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases"),
	expectedFileName:
		"expected.yaml",
	getActualForTestCase,
	processArguments:
		process.argv,
});

function getActualForTestCase(
	{ content },
) {
	const stack = parseStackFromYaml(content);

	inferLevelsInStack(stack);

	return formatStackAsYaml(stack);
}

function parseStackFromYaml(
	yaml,
) {
	return (
		createStackFromYaml(
			// @ts-ignore
			parseYaml(
				yaml,
			),
		)
	);
}

function formatStackAsYaml(
	stack,
) {
	return (
		formatYaml(
			createYamlFromStack(stack),
			{ lineWidth: Number.MAX_SAFE_INTEGER },
		)
		.trimRight()
	);
}