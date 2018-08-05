const
	createWebpackPluginForFileContent = require("../../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../../Harnesses/getWebpackConfigForDirectory");

module.exports =
	{
		...getWebpackConfigForDirectory(`${__dirname}/../../Harnesses/Output/Renderer/`),
		plugins:
			[
				createWebpackPluginForFileContent({
					file: "../dogfooding.output/.yaml",
					name: "yamlFromWebpack",
				}),
			],
	};