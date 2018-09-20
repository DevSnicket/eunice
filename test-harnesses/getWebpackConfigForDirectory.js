const
	path = require("path"),
	pluginDiscoveryCommonjsBabelPlugin = require("@devsnicket/plugin-discovery-commonjs-babel-plugin"),
	transformObjectRestSpreadBabelPlugin = require("babel-plugin-transform-object-rest-spread");

module.exports =
	directory => (
		{
			devtool:
				"source-map",
			entry:
				[ "babel-polyfill", "./harness.js" ],
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
														[
															pluginDiscoveryCommonjsBabelPlugin,
															{ rootDirectory: path.join(__dirname, "..") },
														],
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