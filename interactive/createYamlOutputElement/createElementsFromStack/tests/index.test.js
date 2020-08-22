// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import createElementsFromStack from "../";
import { createHashFromLocation } from "@devsnicket/eunice-test-harnesses";
import fileSystem from "fs-extra";
import formatXml from "xml-formatter";
import parseStackWithDependencyDirectionAndMutualStackFromYaml from "../../../parseStackWithDependencyDirectionAndMutualStackFromYaml";
import path from "path";
import readTextFile from "../../../readTextFile";
import { renderToStaticMarkup } from "react-dom/server";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

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