// cSpell:words devtool

const
	createCodeEditorEntryForLanguages = require("../codeEditor/serviceWorkers").createWebpackEntryForLanguages,
	createCopyPluginsForHtmlWithCssFiles = require("./createCopyPluginsForHtmlWithCssFiles"),
	createModuleWithBabelPlugins = require("./createModuleWithBabelPlugins"),
	{ DefinePlugin } = require("webpack"),
	path = require("path"),
	{ readFileSync } = require("fs");

module.exports =
	({
		babelPlugins = [],
		codeEditorLanguages = [],
		contentFromFile,
		cssFiles = [],
		directory,
		indexFile,
	}) => (
		{
			devtool:
				"source-map",
			entry:
				{
					harness: [ "babel-polyfill", indexFile ],
					...createCodeEditorEntryForLanguages(codeEditorLanguages),
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
					...createCopyPluginsForHtmlWithCssFiles(
						cssFiles,
					),
				],
		}
	);