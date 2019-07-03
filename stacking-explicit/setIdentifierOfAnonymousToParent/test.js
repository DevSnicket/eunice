/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const setIdentifierOfAnonymousToParent = require(".");

test.each(
	[
		[ null, null ],
		[ "item", "item" ],
		[ {}, {} ],
		[
			{ aProperty: "aValue" },
			{ aProperty: "aValue" },
		],
		[
			{ id: "item" },
			{ id: "item" },
		],
		[
			[ "item1", "item2" ],
			[ "item1", "item2" ],
		],
		[
			[ { id: "item1" }, { id: "item2" } ],
			[ { id: "item1" }, { id: "item2" } ],
		],
		[
			[
				[ "upper1", "upper2" ],
				[ "lower1", "lower2" ],
			],
			[
				[ "upper1", "upper2" ],
				[ "lower1", "lower2" ],
			],
		],
		[
			{
				id: "parent",
				items: "child",
			},
			{
				id: "parent",
				items: "child",
			},
		],
		[
			{
				id: "parent",
				items: {},
			},
			{
				id: "parent",
				items: { id: "parent" },
			},
		],
		[
			{
				aParentProperty: "aParentValue",
				id: "parent",
				items: { aChildProperty: "aChildValue" },
			},
			{
				aParentProperty:
					"aParentValue",
				id:
					"parent",
				items:
					{
						aChildProperty: "aChildValue",
						id: "parent",
					},
			},
		],
		[
			{
				id: "grandparent",
				items: { items: { } },
			},
			{
				id:
					"grandparent",
				items:
					{
						id: "grandparent",
						items: { id: "grandparent" },
					},
			},
		],
	],
)(
	"%j returns %j",
	(
		items,
		expected,
	) =>
		expect(
			setIdentifierOfAnonymousToParent(
				items,
			),
		)
		.toEqual(expected),
);