const path = require("path");

module.exports = {
	devtool: "source-map",
	entry: "./harness.source.js",
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						plugins: [ "transform-object-rest-spread" ],
						presets: [ "env" ],
					},
				},
			},
		],
	},
	output: {
		filename: "harness.bundle.js",
		path: path.resolve(__dirname),
	},
};