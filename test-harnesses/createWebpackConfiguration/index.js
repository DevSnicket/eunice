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
					new CopyPlugin(
						[ "harness.html", "react-reflex.css" ]
						.map(filename => path.join(__dirname, "..", filename)),
					),
				],
		}
	);