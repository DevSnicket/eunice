const pluginProposalObjectRestSpreadBabel = require("@babel/plugin-proposal-object-rest-spread");

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
												pluginProposalObjectRestSpreadBabel,
											],
										presets:
											[ "@babel/env" ],
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