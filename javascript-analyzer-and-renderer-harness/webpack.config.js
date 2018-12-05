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
				file: `${__dirname}/example.js`,
				placeholder: "javascriptFromWebpack",
			},
		directory:
			`${__dirname}/output/`,
		indexFile:
			"./index.js",
	});