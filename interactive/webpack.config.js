const createWebpackConfiguration = require("./createWebpackConfiguration");

module.exports =
	createWebpackConfiguration({
		javascriptSubstitution:
			{
				pattern: "yamlFromWebpack",
				replacementFilePath: "../../dogfooding/.yaml",
			},
		outputDirectoryName:
			"renderer",
	});