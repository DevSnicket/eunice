// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ BannerPlugin } = require("webpack"),
	path = require("path");

module.exports =
	{
		// cSpell:words devtool
		devtool:
			"source-map",
		entry:
			"./index.js",
		node:
			{ __dirname: false },
		output:
			{
				filename: "bin.js",
				path: path.join(__dirname, "dist"),
			},
		plugins:
			[
				new BannerPlugin({
					banner: "#!/usr/bin/env node",
					raw: true,
				}),
			],
		target:
			"node",
	};