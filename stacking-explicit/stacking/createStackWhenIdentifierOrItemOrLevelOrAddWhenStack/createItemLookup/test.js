// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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