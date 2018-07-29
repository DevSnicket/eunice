const
	path = require("path");

const
	getSvgForYaml = require("./getSvgForYaml"),
	runTestsInFileSystem = require("../Tests/runTestsInFileSystem");

runTestsInFileSystem({
	action: yaml => getSvgForYaml({ yaml }),
	caseFileName: ".yaml",
	directory: path.join(__dirname, "getSvgForYaml.testcases/"),
	expectedFileName: ".svg",
	processArguments: process.argv,
});