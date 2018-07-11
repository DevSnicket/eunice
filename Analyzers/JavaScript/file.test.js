const path = require("path");

const
	getYamlFromJavaScript = require("./getYamlFromJavaScript"),
	runTestsInFileSystem = require("../../Tests/runTestsInFileSystem");

runTestsInFileSystem({
	action: getYamlFromJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "file.testcases/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});