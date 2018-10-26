const path = require("path");

const
	getYamlFromJavaScript = require("."),
	runTestsFromFileSystem = require("../../runTestsFromFileSystem");

runTestsFromFileSystem({
	action: getYamlFromJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "test-cases/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});