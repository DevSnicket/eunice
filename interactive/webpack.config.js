const createWebpackConfiguration = require("./createWebpackConfiguration");

module.exports =
	createWebpackConfiguration({
		contentFromFile:
			{
				file: "../../dogfooding/.yaml",
				placeholder: "yamlFromWebpack",
			},
		outputDirectoryName:
			"renderer",
	});