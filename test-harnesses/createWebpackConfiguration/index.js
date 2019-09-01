/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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
		title = "Test Harness",
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
						title,
					}),
					new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
				],
		}
	);