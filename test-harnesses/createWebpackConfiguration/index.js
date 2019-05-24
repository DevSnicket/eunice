// cSpell:words devtool

const
	CopyPlugin = require("copy-webpack-plugin"),
	createModuleWithBabelPlugins = require("./createModuleWithBabelPlugins"),
	{ DefinePlugin } = require("webpack"),
	path = require("path"),
	{ readFileSync } = require("fs");

module.exports =
	({
		babelPlugins = [],
		contentFromFile,
		directory,
		entry = null,
		indexFile,
	}) => (
		{
			devtool:
				"source-map",
			entry:
				{
					...entry,
					harness: [ "@babel/polyfill", indexFile ],
				},
			externals:
				{ "./createWebpackConfiguration": "null" },
			module:
				createModuleWithBabelPlugins(babelPlugins),
			node:
				{ fs: "empty" },
			output:
				{
					filename: "[name].js",
					path: path.resolve(directory),
				},
			plugins:
				[
					new DefinePlugin({ [contentFromFile.placeholder]: `\`${readFileSync(contentFromFile.file, "utf-8")}\`` }),
					new CopyPlugin([ path.join(__dirname, "..", "harness.html") ]),
				],
		}
	);