/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import fs from "fs-extra";
import getOrCreateItemsInDirectory from "..";
import getYamlForItemOrItems from "../../getYamlForItemOrItems";
import path from "path";

const
	rootItemIdentifier = "rootItemIdentifier",
	testCasesDirectory = path.join(__dirname, "test-cases");

const emptyTestCaseDirectory = path.join(testCasesDirectory, "empty");

beforeAll(
	() => fs.ensureDir(emptyTestCaseDirectory),
);

test(
	"Empty directory returns null",
	async() =>
		expect(
			await getOrCreateItemsInDirectory(
				{ directory: emptyTestCaseDirectory },
			),
		)
		.toBeNull(),
);

test(
	"Invalid syntax throws error with file path",
	async() =>
		(
			await expect(
				getOrCreateItemsInDirectory({
					directory: path.join(testCasesDirectory, "invalid"),
					rootItemIdentifier,
				}),
			)
		)
		.rejects
		.toThrowError(
			`Analysis of file "${path.join(rootItemIdentifier, "index.js")}" raised the following error.\n\nUnexpected token (1:1)`,
		),
);

test(
	"Valid syntax returns expected YAML",
	async() => {
		const validTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"valid",
			);

		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						validTestCasesDirectory,
					ignorePathPattern:
						new RegExp(`^(node_modules|ignoredSubdirectory\\${path.sep}ignoredSubdirectoryOfSubdirectory|ignored\\.js)`),
				}),
			),
		)
		.toBe(
			await readYamlFile({
				directoryPath: validTestCasesDirectory,
				fileName: "expected.yaml",
			}),
		);
	},
);

test(
	"Root item identifier and empty directory returns directory item",
	async() =>
		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						emptyTestCaseDirectory,
					rootItemIdentifier,
				}),
			),
		)
		.toBe("id: rootItemIdentifier\ntype: directory"),
);

test(
	"Root item identifier used in ancestor paths",
	async() => {
		const rootItemIdentifierTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"root-item-identifier",
			);

		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						rootItemIdentifierTestCasesDirectory,
					rootItemIdentifier,
				}),
			),
		)
		.toBe(
			await readYamlFile({
				directoryPath: rootItemIdentifierTestCasesDirectory,
				fileName: "expected.yaml",
			}),
		);
	},
);

function readYamlFile({
	directoryPath,
	fileName,
}) {
	return (
		fs.readFile(
			path.join(directoryPath, fileName),
			"utf-8",
		)
	);
}