// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const createItemLookup = require(".");

const
	anonymousItem = { property: "value" },
	item = { id: "item" },
	otherItem = { id: "otherItem" };

describe(
	"useItem",
	() =>
		test.each(
			[
				[
					{
						identifierOrItemOrLevelOrStack: null,
						targetIdentifierOrItem: null,
					},
					null,
				],
				[
					{
						identifierOrItemOrLevelOrStack: "item",
						targetIdentifierOrItem: "newItem",
					},
					null,
				],
				[
					{
						identifierOrItemOrLevelOrStack: "item",
						targetIdentifierOrItem: "item",
					},
					"item",
				],
				[
					{
						identifierOrItemOrLevelOrStack: item,
						targetIdentifierOrItem: "item",
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: item,
						targetIdentifierOrItem: item,
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: anonymousItem,
						targetIdentifierOrItem: null,
					},
					anonymousItem,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ "item", "otherItem" ],
						targetIdentifierOrItem: "item",
					},
					"item",
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ "item" ],
						targetIdentifierOrItem: "newItem",
					},
					null,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ item, otherItem ],
						targetIdentifierOrItem: "item",
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ item, otherItem ],
						targetIdentifierOrItem: item,
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ otherItem, item ],
						targetIdentifierOrItem: "item",
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ [ item ], [ otherItem ] ],
						targetIdentifierOrItem: "item",
					},
					item,
				],
			],
		)(
			"%j returns %j",
			(
				{ identifierOrItemOrLevelOrStack, targetIdentifierOrItem },
				existing,
			) =>
				expect(
					createItemLookup(identifierOrItemOrLevelOrStack)
					.useItem(targetIdentifierOrItem),
				)
				.toBe(existing),
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
	"%j, after useItem \"inTarget\", getIdentifiersNotUsed returns null.",
	identifierOrItemOrLevelOrStack => {
		const itemLookup = createItemLookup(identifierOrItemOrLevelOrStack);

		itemLookup.useItem("inTarget");

		expect(
			itemLookup.getIdentifiersNotUsed(),
		)
		.toEqual(
			null,
		);
	},
);