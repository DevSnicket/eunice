const path = require("path");

const
	getYamlFromJavaScript = require("."),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	action: getYamlFromJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "test-cases/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});