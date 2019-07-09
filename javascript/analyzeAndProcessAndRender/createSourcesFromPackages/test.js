/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createSourcesFromPackages = require("."),
	path = require("path");

test.each(
	[
		[
			{ name: "package", scope: "scope" },
			path.join("node_modules", "@scope", "package"),
		],
		[
			{ name: "package", prefix: "prefix-" },
			path.join("node_modules", "prefix-package"),
		],
	],
)(
	"%j returns %s.",
	(
		{ name, prefix, scope },
		directory,
	) =>
		expect(
			createSourcesFromPackages({
				names: [ name ],
				prefix,
				scope,
			}),
		)
		.toEqual(
			[ {
				directory,
				rootItemIdentifier: "package",
			} ],
		),
);