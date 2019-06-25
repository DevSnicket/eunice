/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{ parse } = require("acorn"),
	walk = require("acorn/dist/walk");

const
	createVisitors = require("./createVisitors");

module.exports =
	javaScript => {
		const visitors = createVisitors();

		walk.ancestor(
			parse(
				removeUnixShebangForNode(javaScript),
				{ ecmaVersion: 9, sourceType: "module" },
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