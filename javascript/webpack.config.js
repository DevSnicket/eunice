/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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