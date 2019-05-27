// cSpell:words devtool

const
	createModuleWithBabelPlugins = require("./createModuleWithBabelPlugins"),
	createTransformJavascriptToHtmlPlugin = require("./createTransformJavascriptToHtmlPlugin"),
	path = require("path"),
	webpack = require("webpack");

module.exports =
	({
		babelPlugins = [],
		directory,
		entry = null,
		indexFile,
		javascriptSubstitution = null,
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
					createTransformJavascriptToHtmlPlugin({
						directory,
						javascriptSubstitution,
					}),
					new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
				],
		}
	);