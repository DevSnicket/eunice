const
	path = require("path"),
	transformObjectRestSpreadBabelPlugin = require("babel-plugin-transform-object-rest-spread");

module.exports =
	({
		babelPlugins = [],
		directory,
		indexFile,
	}) => (
		{
			devtool:
				"source-map",
			entry:
				[ "babel-polyfill", indexFile ],
			module:
				{
					rules:
						[
							{
								exclude: /node_modules/,
								test: /\.js$/,
								use:
									{
										loader: "babel-loader",
										options:
											{
												plugins:
													[
														...babelPlugins,
														transformObjectRestSpreadBabelPlugin,
													],
												presets:
													[ "env" ],
											},
									},
							},
						],
				},
			output:
				{
					filename: "harness.js",
					path: path.resolve(directory),
				},
		}
	);