const
	createWebpackPluginForFileContent = require("../../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../../Harnesses/createWebpackConfiguration");

const config =
	getWebpackConfigForDirectory({
		directory: `${__dirname}/output/`,
		indexFile: "./harness/index.js",
	});

module.exports =
	{
		...config,
		plugins:
			[
				...config.plugins || [],
				createWebpackPluginForFileContent({
					file: "../dogfooding/output/.yaml",
					name: "yamlFromWebpack",
				}),
			],
	};