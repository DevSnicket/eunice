/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import pluginProposalObjectRestSpreadBabel from "@babel/plugin-proposal-object-rest-spread";

export default
babelPlugins =>
	({
		rules:
			[
				{
					exclude:
						/node_modules(?!\/@devsnicket)/,
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
	});