const
	path = require("path");

const
	getSvgForYaml = require("."),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	action: yaml => getSvgForYaml({ yaml }),
	caseFileName: ".yaml",
	directory: path.join(__dirname, "testcases/"),
	expectedFileName: ".svg",
	processArguments: process.argv,
});