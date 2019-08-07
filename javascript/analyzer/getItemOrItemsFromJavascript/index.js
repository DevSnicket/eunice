/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createVisitors = require("./createVisitors"),
	parser = require("@babel/parser"),
	walk = require("./walk");

module.exports =
	(/** @type {import("./Parameter.d")} */{
		babelParserPlugins,
		ignoreStaticMethodsOf,
		javascript,
	}) => {
		const visitors = createVisitors({ ignoreStaticMethodsOf });

		walk(
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
		);

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