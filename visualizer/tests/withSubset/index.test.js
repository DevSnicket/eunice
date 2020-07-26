// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getSvgForYaml from "../getSvgForYaml";
import path from "path";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

test(
	"subset of item with no child items throws error",
	() =>
		expect(
			() =>
				getSvgForYaml({
					subsetIdentifierHierarchy: [ "parent" ],
					yaml: "parent",
				}),
		)
		.toThrowError("Final item of subset identifier hierarchy \"parent\" has no child items."),
);

const testCaseDirectoryAbsolutePath =
	path.join(__dirname, "test-cases");

runTestsFromFileSystem({
	caseFileName:
		".yaml",
	directoryAbsolutePath:
		testCaseDirectoryAbsolutePath,
	expectedFileName:
		".svg",
	getActualForTestCase:
		({ content }) =>
			getSvgForYaml({
				subsetIdentifierHierarchy:
					[ "parent" ],
				yaml:
					content,
			}),
	processArguments:
		process.argv,
});