const
	path = require("path");

const
	getSvgForYaml = require("./getSvgForYaml"),
	runTestsInFileSystem = require("../Tests/runTestsInFileSystem");

runTestsInFileSystem({
	action: getSvgForYaml,
	caseFileName: ".yaml",
	directory: path.join(__dirname, "getSvgForYaml.testcases/"),
	expectedFileName: ".svg",
	processArguments: process.argv,
});