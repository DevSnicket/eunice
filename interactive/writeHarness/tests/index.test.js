/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { emptyDir, pathExists } from "fs-extra";
import path from "path";
import readDirectoryPathRecursive from "./readDirectoryPathRecursive";
import readTextFile from "../../readTextFile";
import writeHarness from "..";

const htmlFileName = "eunice.html";

test.each(
	[
		[
			false,
			[ htmlFileName ],
		],
		[
			true,
			[
				htmlFileName,
				{
					"monaco-editor":
						[ {
							editor:
								[
									"editor.worker.js",
									"editor.worker.js.map",
								],
						} ],
				},
			],
		],
	],
)(
	"includeServiceWorkers %s outputs %j",
	async(
		includeServiceWorkers,
		expectedFiles,
	) => {
		const sourceDirectoryPath = path.join(__dirname, "..", "..", "dist");

		if (!await pathExists(sourceDirectoryPath))
			throw Error(`Source directory "${sourceDirectoryPath}" not found. NPM package script "build" must be run before this test.`);

		const directoryPath = path.join(__dirname, "output", `includeServiceWorkers=${includeServiceWorkers}`);

		await emptyDir(directoryPath);

		await writeHarness({
			areDependenciesOfAncestorsIncluded:
				false,
			directoryPath,
			htmlFileName,
			includeServiceWorkers,
			isInferStacksEnabled:
				false,
			sourceDirectoryPath,
			yaml:
				await readTextFile(
					path.join(__dirname, ".yaml"),
				),
		});

		expect({
			files: await readDirectoryPathRecursive(directoryPath),
			htmlFileContainsYamlFileContent: await readHtmlFileContainsYamlFileContent(),
		})
		.toEqual({
			files: expectedFiles,
			htmlFileContainsYamlFileContent: true,
		});

		async function readHtmlFileContainsYamlFileContent() {
			const html = await readTextFile(path.join(directoryPath, htmlFileName));

			return html.includes("\"test yaml file contents\\non multiple lines with a quote character \\\"\"");
		}
	},
);