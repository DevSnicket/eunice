const transformObjectRestSpreadBabelPlugin = require("babel-plugin-transform-object-rest-spread");

module.exports =
	babelPlugins => (
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
		}
	);