// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	inferStacks = require("."),
	{
		safeDump: formatYaml,
		safeLoad: parseYaml,
	} = require("js-yaml"),
	path = require("path"),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	caseFileName:
		"source.yaml",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases"),
	expectedFileName:
		"expected.yaml",
	getActualForTestCase:
		({ content }) =>
			formatYaml(inferStacks(parseYaml(content)))
			.trimRight(),
	processArguments:
		process.argv,
});