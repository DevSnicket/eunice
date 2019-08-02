/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createAcornParserAndWalkBaseVisitor = require("./createAcornParserAndWalkBaseVisitor"),
	createVisitors = require("./createVisitors"),
	walk = require("acorn-walk");

module.exports =
	({
		isClassFieldEnabled,
		isReactJsxEnabled,
		javascript,
	}) => {
		const
			{ Parser, walkBaseVisitor } =
				createAcornParserAndWalkBaseVisitor({
					isClassFieldEnabled,
					isReactJsxEnabled,
				}),
			visitors =
				createVisitors();

		walk.ancestor(
			Parser.parse(
				removeUnixShebangForNode(javascript),
				{ ecmaVersion: 9, sourceType: "module" },
			),
			visitors,
			walkBaseVisitor,
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