// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createVisitors = require("./createVisitors"),
	parser = require("@babel/parser"),
	walk = require("./walk");

module.exports =
	(/** @type {import("./Parameter.d")} */{
		babelParserPlugins,
		fileExtensions,
		isCalleeIgnored,
		javascript,
	}) => {
		const visitors =
			createVisitors({
				fileExtensions,
				isCalleeIgnored,
			});

		walk({
			node:
				parser.parse(
					removeUnixShebangForNode(javascript),
					{
						plugins:
							[
								"estree",
								...babelParserPlugins || [],
							],
						sourceType:
							"module",
					},
				),
			visitors,
		});

		return visitors.getItemOrItems();
	};

function removeUnixShebangForNode(
	javascript,
) {
	const shebang = "#!/usr/bin/env node";

	return (
		javascript.startsWith(shebang)
		?
		javascript.substring(
			Math.max(
				shebang.length,
				javascript.indexOf("\n"),
			),
		)
		:
		javascript
	);
}