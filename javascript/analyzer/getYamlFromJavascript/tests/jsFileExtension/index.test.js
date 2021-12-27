// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getYamlFromJavascript from "../..";
import path from "path";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

runTestsFromFileSystem({
	caseFileName:
		".js",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases"),
	expectedFileName:
		".yaml",
	getActualForTestCase:
		({ content }) =>
			getYamlFromJavascript({
				fileExtensions: [ ".js" ],
				javascript: content,
			}),
	processArguments:
		process.argv,
});