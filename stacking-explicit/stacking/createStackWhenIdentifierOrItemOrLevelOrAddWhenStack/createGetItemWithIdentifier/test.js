/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createGetItemWithIdentifier = require("."),
	createTestItemWithIdentifier = require("../createTestItemWithIdentifier");

const
	item = createTestItemWithIdentifier("item"),
	otherItem = createTestItemWithIdentifier("otherItem");

test.each(
	[
		[
			{
				identifier: null,
				identifierOrItemOrLevelOrStack: null,
			},
			null,
		],
		[
			{
				identifier: "item",
				identifierOrItemOrLevelOrStack: "item",
			},
			"item",
		],
		[
			{
				identifier: "item",
				identifierOrItemOrLevelOrStack: item,
			},
			item,
		],
		[
			{
				identifier: "item",
				identifierOrItemOrLevelOrStack: [ "item", "otherItem" ],
			},
			"item",
		],
		[
			{
				identifier: "item",
				identifierOrItemOrLevelOrStack: [ item, otherItem ],
			},
			item,
		],
		[
			{
				identifier: "item",
				identifierOrItemOrLevelOrStack: [ otherItem, item ],
			},
			item,
		],
		[
			{
				identifier: "item",
				identifierOrItemOrLevelOrStack: [ [ item ], [ otherItem ] ],
			},
			item,
		],
	],
)(
	"%j returns %j",
	(
		{ identifier, identifierOrItemOrLevelOrStack },
		existing,
	) =>
		expect(
			createGetItemWithIdentifier(
				identifierOrItemOrLevelOrStack,
			)(
				identifier,
			),
		)
		.toEqual(existing),
);