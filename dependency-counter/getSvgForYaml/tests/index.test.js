// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getSvgForYaml from "..";
import path from "path";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

runTestsFromFileSystem({
	caseFileName:
		".yaml",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases/"),
	expectedFileName:
		".svg",
	getActualForTestCase:
		({ content }) => getSvgForYaml({ yaml: content }),
	processArguments:
		process.argv,
});