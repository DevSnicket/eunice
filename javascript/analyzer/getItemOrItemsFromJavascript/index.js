/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createPlugins = require("./createPlugins"),
	createVisitors = require("./createVisitors"),
	parser = require("@babel/parser"),
	walk = require("./walk");

module.exports =
	({
		isProposalsInStage3Enabled,
		isReactJsxEnabled,
		javascript,
	}) => {
		const visitors = createVisitors();

		walk(
			parser.parse(
				removeUnixShebangForNode(javascript),
				{
					plugins:
						createPlugins({
							isProposalsInStage3Enabled,
							isReactJsxEnabled,
						}),
					sourceType: "module",
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