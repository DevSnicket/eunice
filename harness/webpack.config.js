const
	createWebpackPluginForFileContent = require("../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../Harnesses/createWebpackConfiguration");

const config =
	getWebpackConfigForDirectory({
		directory: `${__dirname}/output/`,
		indexFile: "./index.js",
	});

module.exports =
	{
		...config,
		plugins:
			[
				...config.plugins || [],
				createWebpackPluginForFileContent({
					file: `${__dirname}/../Analyzer/harness/example.js`,
					name: "javascriptFromWebpack",
				}),
			],
	};