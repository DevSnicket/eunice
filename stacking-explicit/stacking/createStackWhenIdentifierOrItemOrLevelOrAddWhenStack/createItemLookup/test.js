/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createItemLookup = require("."),
	createTestItemWithIdentifier = require("../createTestItemWithIdentifier");

const
	item = createTestItemWithIdentifier("item"),
	otherItem = createTestItemWithIdentifier("otherItem");

describe(
	"getItemWithIdentifier",
	() =>
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
						identifier: "newItem",
						identifierOrItemOrLevelOrStack: "item",
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
						identifier: "newItem",
						identifierOrItemOrLevelOrStack: [ "item" ],
					},
					null,
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
					createItemLookup(identifierOrItemOrLevelOrStack)
					.getItemWithIdentifier(identifier),
				)
				.toEqual(existing),
		),
);

describe(
	"getIdentifiersNotUsed",
	() =>
		test.each(
			[
				[
					null,
					null,
				],
				[
					"notInTarget",
					[ "notInTarget" ],
				],
				[
					{ id: "notInTarget" },
					[ "notInTarget" ],
				],
				[
					[ "notInTarget" ],
					[ "notInTarget" ],
				],
				[
					[ { id: "notInTarget" } ],
					[ "notInTarget" ],
				],
				[
					[ "leftNotInTarget", "rightNotInTarget" ],
					[ "leftNotInTarget", "rightNotInTarget" ],
				],
				[
					[ [ "upperNotInTarget" ], [ "lowerNotInTarget" ] ],
					[ "upperNotInTarget", "lowerNotInTarget" ],
				],
			],
		)(
			"%j returns %j",
			(
				identifierOrItemOrLevelOrStack,
				identifiersNotUsed,
			) =>
				expect(
					createItemLookup(identifierOrItemOrLevelOrStack)
					.getIdentifiersNotUsed(),
				)
				.toEqual(
					identifiersNotUsed,
				),
		),
);

test.each(
	[
		"inTarget",
		{ id: "inTarget" },
		[ "inTarget" ],
		[ [ "inTarget" ] ],
	],
)(
	"%j, after getItemWithIdentifier \"inTarget\", getIdentifiersNotUsed returns null.",
	identifierOrItemOrLevelOrStack => {
		const itemLookup = createItemLookup(identifierOrItemOrLevelOrStack);

		itemLookup.getItemWithIdentifier("inTarget");

		expect(
			itemLookup.getIdentifiersNotUsed(),
		)
		.toEqual(
			null,
		);
	},
);