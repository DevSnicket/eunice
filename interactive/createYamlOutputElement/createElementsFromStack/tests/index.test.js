/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { createElement } from "react";
import createElementsFromStack from "../";
import { createHashFromLocation } from "../../../../test-harnesses";
import fileSystem from "fs-extra";
import formatXml from "xml-formatter";
import parseStackWithDependencyDirectionAndMutualStackFromYaml from "../../../parseStackWithDependencyDirectionAndMutualStackFromYaml";
import path from "path";
import readTextFile from "../../../readTextFile";
import { renderToStaticMarkup } from "react-dom/server";
import runTestsFromFileSystem from "../../../../run-tests-from-file-system";

runTestsFromFileSystem({
	caseFileName:
		".yaml",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases"),
	expectedFileName:
		".html",
	getActualForTestCase:
		async({
			content,
			fileAbsolutePath,
		}) =>
			formatHtml(
				renderToStaticMarkup(
					createElementsFromStack({
						areDependenciesOfAncestorsIncluded:
							false,
						createElement,
						locationHash:
							await readLocationHashForTestCaseFilePath(
								fileAbsolutePath,
							),
						resizableElementTypes:
							null,
						stack:
							parseStackWithDependencyDirectionAndMutualStackFromYaml(
								content,
							),
					}),
				),
			),
	processArguments:
		process.argv,
});

async function readLocationHashForTestCaseFilePath(
	testCaseFilePath,
) {
	return (
		createHashFromLocation({
			hash:
				await readLocationHashFilePath(
					path.join(
						path.dirname(testCaseFilePath),
						"location-hash",
					),
				),
		})
	);
}

async function readLocationHashFilePath(
	filePath,
) {
	return (
		await fileSystem.pathExists(filePath)
		&&
		readTextFile(filePath)
	);
}

function formatHtml(
	html,
) {
	return (
		formatXml(
			html,
			{
				collapseContent: true,
				indentation: "\t",
				lineSeparator: "\n",
			},
		)
	);
}

test(
	"location without hash prefix throws error",
	() =>
		expect(
			() =>
				createElementsFromStack({
					areDependenciesOfAncestorsIncluded:
						false,
					createElement,
					locationHash:
						createHashFromLocation({ hash: "no hash prefix" }),
					resizableElementTypes:
						null,
					stack:
						null,
				}),
		)
		.toThrowError(
			"Location hash must start with a hash character.",
		),
);

test(
	"subset of item without child items throws error",
	() =>
		expect(
			() =>
				createElementsFromStack({
					areDependenciesOfAncestorsIncluded:
						false,
					createElement,
					locationHash:
						createHashFromLocation({ hash: "#subset-item=grandparent/parent" }),
					resizableElementTypes:
						null,
					stack:
						[ [ {
							id: "grandparent",
							items: [ [ { id: "parent" } ] ],
						} ] ],
				}),
		)
		.toThrowError(
			"Final item of subset identifier hierarchy \"grandparent->parent\" has no child items.",
		),
);