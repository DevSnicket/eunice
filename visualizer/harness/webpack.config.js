const
	createWebpackPluginForFileContent = require("../../Harnesses/createWebpackPluginForFileContent"),
	getWebpackConfigForDirectory = require("../../Harnesses/createWebpackConfiguration"),
	path = require("path"),
	pluginDiscoveryCommonjsBabelPlugin = require("@devsnicket/plugin-discovery-commonjs-babel-plugin");

const config =
	getWebpackConfigForDirectory({
		babelPlugins:
			[
				[
					pluginDiscoveryCommonjsBabelPlugin,
					{ rootDirectory: path.join(__dirname, "..", "..", "Processors") },
				],
			],
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