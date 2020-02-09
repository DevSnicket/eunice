/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

// cSpell:words devtool

import createModuleWithBabelPlugins from "./createModuleWithBabelPlugins";
import createTransformJavascriptToHtmlPlugin from "./createTransformJavascriptToHtmlPlugin";
import path from "path";
import webpack from "webpack";

export default ({
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
		// Workaround for renderer harness that requires @ungap/url-search-params using ES (which needs to specify default) instead of CommonJS (which does not and is used by tests).
		resolve:
			{ mainFields: [ "main", "module" ] },
	}
);