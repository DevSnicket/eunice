const
	path = require("path");

const
	getSvgForYaml = require("."),
	runTestsInFileSystem = require("../../Tests/runTestsInFileSystem");

runTestsInFileSystem({
	action: yaml => getSvgForYaml({ yaml }),
	caseFileName: ".yaml",
	directory: path.join(__dirname, "testcases/"),
	expectedFileName: ".svg",
	processArguments: process.argv,
});