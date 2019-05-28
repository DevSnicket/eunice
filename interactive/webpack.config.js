const createWebpackConfiguration = require("./createWebpackConfiguration");

module.exports =
	createWebpackConfiguration({
		directory:
			"dist/harness",
		javascriptSubstitution:
			{
				pattern: "yamlFromWebpack",
				replacementFilePath: "../../dogfooding/.yaml",
			},
	});