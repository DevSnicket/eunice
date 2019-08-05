/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const removeRedundantParentIdentifierPrefix = require(".");

test.each(
	[
		[ "item", "item" ],
		[
			[ "item" ],
			"item",
		],
		[
			[ [ "item" ] ],
			"item",
		],
		[
			{ id: "item" },
			"item",
		],
		[
			{ id: "parent", items: "child" },
			{ id: "parent", items: "child" },
		],
		[
			{ id: "parent", items: "parent/child" },
			{ id: "parent", items: "child" },
		],
		[
			{
				id: "grandparent",
				items: { id: "grandparent/parent", items: "grandparent/parent/child" } },
			{
				id: "grandparent",
				items: { id: "parent", items: "child" },
			},
		],
		[
			{ dependsUpon: "missing" },
			{ dependsUpon: "missing" },
		],
		[
			{ dependsUpon: "parent/child", id: "parent", items: "parent/child" },
			{ dependsUpon: "child", id: "parent", items: "child" },
		],
		[
			{
				id: "grandparent",
				items: { id: "grandparent/parent", items: { dependsUpon: "grandparent/parent" } },
			},
			{
				id: "grandparent",
				items: { id: "parent", items: { dependsUpon: "parent" } },
			},
		],
		[
			[
				{ dependsUpon: "parent/child" },
				{ id: "parent", items: "parent/child" },
			],
			[
				{ dependsUpon: "child" },
				{ id: "parent", items: "child" },
			],
		],
		[
			[
				{ id: "parent", items: "parent/child" },
				{ dependsUpon: "parent/child" },
			],
			[
				{ id: "parent", items: "child" },
				{ dependsUpon: "child" },
			],
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			removeRedundantParentIdentifierPrefix({
				identifierSeparator: "/",
				items,
			}),
		)
		.toEqual(expected),
);