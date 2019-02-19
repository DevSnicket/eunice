const createWebpackConfiguration = require("./createWebpackConfiguration");

module.exports =
	createWebpackConfiguration({
		contentFromFile:
			{
				file: "../../dogfooding/output/.yaml",
				placeholder: "yamlFromWebpack",
			},
		outputDirectoryName:
			"renderer",
	});