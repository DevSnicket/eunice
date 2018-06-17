const
	formatYaml = require("js-yaml").safeDump,
	parse = require("acorn").parse,
	walk = require("acorn/dist/walk");

const
	generate = require("./generate"),
	runTestsInFileSystem = require("../../../runTestsInFileSystem.js");

runTestsInFileSystem({
	action: generateFile,
	argument: process.argv[2],
	caseFileName: ".js",
	directory: __dirname + "/tests/",
	expectedFileName: ".yaml",
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