const
	{ createWebpackConfiguration } = require("@devsnicket/eunice-test-harnesses"),
	pluginDiscoveryCommonjsBabelPlugin = require("@devsnicket/plugin-discovery-commonjs-babel-plugin");

module.exports =
	createWebpackConfiguration({
		babelPlugins:
			[
				[
					pluginDiscoveryCommonjsBabelPlugin,
				],
			],
		contentFromFile:
			{
				file: "../../dogfooding/output/.yaml",
				placeholder: "yamlFromWebpack",
			},
		directory:
			`${__dirname}/../output/renderer`,
		indexFile:
			"./index.js",
	});