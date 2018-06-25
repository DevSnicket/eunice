const
	formatYaml = require("js-yaml").safeDump,
	parse = require("acorn").parse,
	path = require("path"),
	walk = require("acorn/dist/walk");

const
	generate = require("./generate"),
	runTestsInFileSystem = require("../../../runTestsInFileSystem.js");

runTestsInFileSystem({
	action: generateFile,
	caseFileName: ".js",
	directory: path.join(__dirname, "tests/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});

function generateFile(
	file
) {
	const yaml =
		generate({
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