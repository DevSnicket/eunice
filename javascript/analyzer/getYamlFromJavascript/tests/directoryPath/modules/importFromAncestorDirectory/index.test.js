/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDirectoryPathFromAbsolutePaths from "../../createDirectoryPathFromAbsolutePaths";
import getYamlFromJavascript from "../../../..";
import path from "path";
import readTextFile from "../../../readTextFile";
import runTestsFromFileSystem from "../../../../../../../run-tests-from-file-system";

const directoryAbsolutePath = path.join(__dirname, "test-cases");

runTestsFromFileSystem({
	caseFileName:
		".js",
	directoryAbsolutePath,
	expectedFileName:
		".yaml",
	getActualForTestCase:
		({ content, fileAbsolutePath }) =>
			getYamlFromJavascript({
				directoryPath:
					createDirectoryPathFromAbsolutePaths({
						directory: directoryAbsolutePath,
						file: fileAbsolutePath,
					}),
				javascript:
					content,
			}),
	processArguments:
		process.argv,
});

test("returns a dependency without reference to root when dependency is on a subdirectory of root and root has rooted path",
	async() => {
		const testCaseDirectoryPath = path.join(directoryAbsolutePath, "sibling-subdirectory", "child-directory");

		expect(
			getYamlFromJavascript({
				directoryPath: { absolute: testCaseDirectoryPath, relative: "/child-directory" },
				javascript: await readTextFile(path.join(testCaseDirectoryPath, ".js")),
			}),
		)
		.toEqual("dependsUpon: module");
	});