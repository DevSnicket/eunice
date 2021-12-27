// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getFirstChildStack from "./getFirstChildStack";
import getSvgForStack from "../getSvgForStack";
import parseStackFromYaml from "../parseStackFromYaml";
import path from "path";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

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
			getSvgForStack({
				stack:
					getFirstChildStack(
						parseStackFromYaml(content),
					),
			}),
	processArguments:
		process.argv,
});