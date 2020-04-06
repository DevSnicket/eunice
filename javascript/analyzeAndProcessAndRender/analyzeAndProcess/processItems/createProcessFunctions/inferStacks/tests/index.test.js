// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import inferStacks from "..";
import jsYaml from "js-yaml";
import path from "path";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

runTestsFromFileSystem({
	caseFileName:
		"source.yaml",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases"),
	expectedFileName:
		"expected.yaml",
	getActualForTestCase:
		({ content }) =>
			jsYaml.safeDump(inferStacks(jsYaml.safeLoad(content)))
			.trimRight(),
	processArguments:
		process.argv,
});