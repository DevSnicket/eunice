const path = require("path");

const
	getYamlForJavaScript = require("./getYamlForJavaScript"),
	runTestsInFileSystem = require("../../Tests/runTestsInFileSystem");

runTestsInFileSystem({
	action: getYamlForJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "file.testcases/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});