const
	createWebpackPluginForFileContent = require("../../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../../Harnesses/getWebpackConfigForDirectory");

const config = getWebpackConfigForDirectory(`${__dirname}/output`);

module.exports =
	{
		...config,
		plugins:
			[
				...config.plugins || [],
				createWebpackPluginForFileContent({
					file: `${__dirname}/example.js`,
					name: "javascriptFromWebpack",
				}),
			],
	};