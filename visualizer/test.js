const
	path = require("path");

const
	getSvgForYaml = require("./getSvgForYaml"),
	runTestsInFileSystem = require("../Tests/runTestsInFileSystem.js");

runTestsInFileSystem({
	action: getSvgForYaml,
	caseFileName: ".yaml",
	directory: path.join(__dirname, "test/"),
	expectedFileName: ".svg",
	processArguments: process.argv,
});