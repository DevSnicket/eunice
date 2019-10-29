// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	path = require("path");

const
	getSvgForYaml = require("."),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	caseFileName:
		".yaml",
	directoryAbsolutePath:
		path.join(__dirname, "testCases/"),
	expectedFileName:
		"expected.svg",
	getActualForTestCase:
		({ content }) => getSvgForYaml({ yaml: content }),
	processArguments:
		process.argv,
});