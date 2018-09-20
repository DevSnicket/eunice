const
	createWebpackPluginForFileContent = require("../../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../../Harnesses/getWebpackConfigForDirectory");

const config = getWebpackConfigForDirectory(`${__dirname}/../../Harnesses/Output/Renderer/`);

module.exports =
	{
		...config,
		plugins:
			[
				...config.plugins || [],
				createWebpackPluginForFileContent({
					file: "../dogfooding.output/.yaml",
					name: "yamlFromWebpack",
				}),
			],
	};