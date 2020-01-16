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

test(
	"Child directory after parent in path throws exception",
	() =>
		expect(
			() =>
				getYamlFromJavascript(
					{ javascript: "import imported from \"child-after-parent/../module\"; imported();" },
				),
		)
		.toThrowError(
			"Paths where a child \"child-after-parent\" is specified before a parent \"..\" are not supported.",
		),
);