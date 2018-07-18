const path = require("path");

const
	getYamlFromJavaScript = require("./getYamlFromJavaScript"),
	runTestsInFileSystem = require("../../Tests/runTestsInFileSystem");

runTestsInFileSystem({
	action: getYamlFromJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "getYamlFromJavaScript.testcases/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});