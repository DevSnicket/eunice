const path = require("path");

module.exports =
	directory => (
		{
			devtool: "source-map",
			entry: "./harness.js",
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
												plugins: [ "transform-object-rest-spread" ],
												presets: [ "env" ],
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