// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	path = require("path");

const
	getSvgForYaml = require("."),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	action: yaml => getSvgForYaml({ yaml }),
	caseFileName: ".yaml",
	directory: path.join(__dirname, "testCases/"),
	expectedFileName: "expected.svg",
	processArguments: process.argv,
});