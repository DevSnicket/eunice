const
	{ createWebpackConfiguration } = require("@devsnicket/eunice-test-harnesses"),
	path = require("path"),
	pluginDiscoveryCommonjsBabelPlugin = require("@devsnicket/plugin-discovery-commonjs-babel-plugin");

module.exports =
	createWebpackConfiguration({
		babelPlugins:
			[
				[
					pluginDiscoveryCommonjsBabelPlugin,
					{ rootDirectory: path.join(__dirname, "..", "renderer") },
				],
			],
		contentFromFile:
			{
				file: `${__dirname}/example.js`,
				placeholder: "javascriptFromWebpack",
			},
		directory:
			`${__dirname}/../output/javascript-analyzer-and-renderer`,
		indexFile:
			"./index.js",
	});