// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDirectoryPathFromAbsolutePaths from "../createDirectoryPathFromAbsolutePaths";
import getYamlFromJavascript from "../../..";
import path from "path";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

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