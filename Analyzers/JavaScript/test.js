const
	formatYaml = require("js-yaml").safeDump,
	parse = require("acorn").parse,
	path = require("path"),
	walk = require("acorn/dist/walk");

const
	analyze = require("./analyze"),
	runTestsInFileSystem = require("../../runTestsInFileSystem.js");

runTestsInFileSystem({
	action: analyzeFile,
	caseFileName: ".js",
	directory: path.join(__dirname, "tests/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
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