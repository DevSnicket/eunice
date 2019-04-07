// cSpell:words devtool

const
	createCopyPluginsForHtmlWithCssFiles = require("./createCopyPluginsForHtmlWithCssFiles"),
	createModuleWithBabelPlugins = require("./createModuleWithBabelPlugins"),
	{ DefinePlugin } = require("webpack"),
	path = require("path"),
	{ readFileSync } = require("fs");

module.exports =
	({
		babelPlugins = [],
		contentFromFile,
		cssFiles,
		directory,
		indexFile,
	}) => (
		{
			devtool:
				"source-map",
			entry:
				[ "babel-polyfill", indexFile ],
			externals:
				{ "./createWebpackConfiguration": "null" },
			module:
				createModuleWithBabelPlugins(babelPlugins),
			node:
				{ fs: "empty" },
			output:
				{
					filename: "harness.js",
					path: path.resolve(directory),
				},
			plugins:
				[
					new DefinePlugin({ [contentFromFile.placeholder]: `\`${readFileSync(contentFromFile.file, "utf-8")}\`` }),
					...createCopyPluginsForHtmlWithCssFiles(
						cssFiles || [],
					),
				],
		}
	);