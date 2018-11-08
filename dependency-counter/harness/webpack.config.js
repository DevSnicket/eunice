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
					{ rootDirectory: path.join(__dirname, "..", "..", "Processors") },
				],
			],
		contentFromFile:
			{
				file: "../dogfooding/output/.yaml",
				placeholder: "yamlFromWebpack",
			},
		directory:
			`${__dirname}/output/`,
		indexFile:
			"./harness/index.js",
	});