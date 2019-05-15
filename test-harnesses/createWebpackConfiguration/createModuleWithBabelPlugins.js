const transformObjectRestSpreadBabelPlugin = require("babel-plugin-transform-object-rest-spread");

module.exports =
	babelPlugins => (
		{
			rules:
				[
					{
						exclude:
							/node_modules(?!\/@devsnicket\/eunice-test-harnesses)/,
						test:
							/\.js$/,
						use:
							{
								loader:
									"babel-loader",
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
					// required by Monaco editor
					{
						test: /\.css$/,
						use: [ "style-loader", "css-loader" ],
					},
				],
		}
	);