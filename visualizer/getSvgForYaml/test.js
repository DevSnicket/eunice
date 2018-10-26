const
	path = require("path");

const
	getSvgForYaml = require("."),
	runTestsFromFileSystem = require("../../runTestsFromFileSystem");

runTestsFromFileSystem({
	action: yaml => getSvgForYaml({ yaml }),
	caseFileName: ".yaml",
	directory: path.join(__dirname, "testcases/"),
	expectedFileName: ".svg",
	processArguments: process.argv,
});