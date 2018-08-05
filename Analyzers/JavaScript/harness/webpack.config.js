const
	createWebpackPluginForFileContent = require("../../../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../../../Harnesses/getWebpackConfigForDirectory");

module.exports =
	{
		...getWebpackConfigForDirectory(`${__dirname}/../../../Harnesses/Output/Analyzers/JavaScript/`),
		plugins:
			[
				createWebpackPluginForFileContent({
					file: `${__dirname}/example.js`,
					name: "javascriptFromWebpack",
				}),
			],
	};