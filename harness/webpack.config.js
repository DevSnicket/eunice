const
	createWebpackPluginForFileContent = require("../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../Harnesses/getWebpackConfigForDirectory");

module.exports =
	{
		...getWebpackConfigForDirectory(`${__dirname}/../Harnesses/Output/`),
		plugins:
			[
				createWebpackPluginForFileContent({
					file: `${__dirname}/../Analyzers/JavaScript/harness/example.js`,
					name: "javascriptFromWebpack",
				}),
			],
	};