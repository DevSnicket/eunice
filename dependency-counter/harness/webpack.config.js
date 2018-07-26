const
	getWebpackConfigForDirectory = require("../../Harnesses/getWebpackConfigForDirectory"),
	readFileSync = require("fs").readFileSync,
	webpack = require("webpack");

module.exports =
	{
		...getWebpackConfigForDirectory(`${__dirname}/../../Harnesses/Output/Renderer/`),
		plugins: [
			new webpack.DefinePlugin({
				yamlFromWebPack:
					`\`${readFileSync("../dogfooding.output/.yaml", "utf-8")}\``,
			}),
		],
	};