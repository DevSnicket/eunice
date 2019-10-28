// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getYamlFromJavascript = require("../.."),
	path = require("path"),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	caseFileName:
		".js",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases"),
	expectedFileName:
		".yaml",
	getActualForTestCase:
		({ content }) =>
			getYamlFromJavascript(
				{ javascript: content },
			),
	processArguments:
		process.argv,
});