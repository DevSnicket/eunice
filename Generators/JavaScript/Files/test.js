const
	formatYaml = require("js-yaml").safeDump,
	parse = require("acorn").parse,
	walk = require("acorn/dist/walk");

const
	analyze = require("./analyze"),
	runTestsInFileSystem = require("../../../runTestsInFileSystem.js");

runTestsInFileSystem({
	action: analyzeFile,
	argument: process.argv[2],
	caseFileName: ".js",
	directory: "tests/",
	expectedFileName: ".yaml",
});

function analyzeFile(
	file
) {
	const yaml =
		analyze({
			file: parse(file, { ecmaVersion: 9 }),
			walk: walk.ancestor,
		});

	return (
		yaml
		?
		formatYaml(yaml)
		.trim()
		:
		"");
}