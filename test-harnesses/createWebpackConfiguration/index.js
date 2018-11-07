const
	createModuleWithBabelPlugins = require("./createModuleWithBabelPlugins"),
	{ DefinePlugin } = require("webpack"),
	path = require("path"),
	{ readFileSync } = require("fs");

module.exports =
	({
		babelPlugins = [],
		contentFromFile,
		directory,
		indexFile,
	}) => (
		{
			devtool:
				"source-map",
			entry:
				[ "babel-polyfill", indexFile ],
			module:
				createModuleWithBabelPlugins(babelPlugins),
			output:
				{
					filename: "harness.js",
					path: path.resolve(directory),
				},
			plugins:
				[
					new DefinePlugin({ [contentFromFile.placeholder]: `\`${readFileSync(contentFromFile.file, "utf-8")}\`` }),
				],
		}
	);