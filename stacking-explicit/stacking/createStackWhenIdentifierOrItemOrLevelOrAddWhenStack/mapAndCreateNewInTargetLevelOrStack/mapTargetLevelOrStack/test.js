/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createTestItemWithIdentifier = require("../../createTestItemWithIdentifier"),
	mapTargetLevelOrStack = require(".");

test(
	"Target of empty, does not call getLevelOrStackForTargetIdentifierOrItem and returns null.",
	() =>
		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
					},
				targetLevelOrStack:
					[],
			}),
		)
		.toBeNull(),
);

test(
	"Target of identifier in level, calls getLevelOrStackForTargetIdentifierOrItem for identifier returns null.",
	() =>
		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						if (targetIdentifierOrItem === "item")
							return null;
						else
							throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
					},
				targetLevelOrStack:
					[ "item" ],
			}),
		)
		.toBeNull(),
);

const
	left = createTestItemWithIdentifier("left"),
	right = createTestItemWithIdentifier("right");

const level = [ left, right ];

describe(
	"Target of identifier in level, calls getLevelOrStackForTargetIdentifierOrItem for identifier",
	() =>
		test.each(
			[
				[
					"item",
					createTestItemWithIdentifier("item"),
				],
				[ "level", level ],
				[
					"stack",
					[
						[ createTestItemWithIdentifier("upper") ],
						[ createTestItemWithIdentifier("lower") ],
					],
				],
			],
		)(
			"returns %s",
			(returnDescription, itemOrLevelOrStack) =>
				expect(
					mapTargetLevelOrStack({
						getLevelOrStackForTargetIdentifierOrItem:
							targetIdentifierOrItem => {
								if (targetIdentifierOrItem === "itemOrLevelOrStack")
									return itemOrLevelOrStack;
								else
									throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
							},
						targetLevelOrStack:
							[ "itemOrLevelOrStack" ],
					}),
				)
				.toEqual(
					itemOrLevelOrStack,
				),
		),
);

test(
	"Target of two identifiers in level, calls getLevelOrStackForTargetIdentifierOrItem for each identifier that return an item each, returns two items.",
	() =>
		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						switch (targetIdentifierOrItem) {
							case left.id:
								return left;
							case right.id:
								return right;
							default:
								throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
						}
					},
				targetLevelOrStack:
					[ left.id, right.id ],
			}),
		)
		.toEqual(
			level,
		),
);

test(
	"Target of two identifiers in level, calls getLevelOrStackForTargetIdentifierOrItem for each identifier that returns an item and a level of two items, returns three items.",
	() => {
		const middle = createTestItemWithIdentifier("middle");

		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						switch (targetIdentifierOrItem) {
							case left.id:
								return left;
							case "rightLevel":
								return [ middle, right ];
							default:
								throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
						}
					},
				targetLevelOrStack:
					[ left.id, "rightLevel" ],
			}),
		)
		.toEqual(
			[
				left,
				middle,
				right,
			],
		);
	},
);

test(
	"Target of two identifiers in level, calls getLevelOrStackForTargetIdentifierOrItem for each identifier that returns an item and a stack of two items, returns three items.",
	() => {
		const
			rightLower = createTestItemWithIdentifier("rightLower"),
			rightUpper = createTestItemWithIdentifier("rightUpper");

		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						switch (targetIdentifierOrItem) {
							case left.id:
								return left;
							case "rightStack":
								return [ [ rightUpper ], [ rightLower ] ];
							default:
								throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
						}
					},
				targetLevelOrStack:
					[ left.id, "rightStack" ],
			}),
		)
		.toEqual(
			[
				left,
				rightUpper,
				rightLower,
			],
		);
	},
);

test(
	"Target of identifier in stack, calls getLevelOrStackForTargetIdentifierOrItem for identifier that returns empty, returns null.",
	() =>
		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						if (targetIdentifierOrItem === "item")
							return [];
						else
							throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
					},
				targetLevelOrStack:
					[ [ "item" ] ],
			}),
		)
		.toBeNull(),
);

test.each(
	[
		[
			"identifier and identifier in level",
			[ "upper", [ "lowerLevel" ] ],
		],
		[
			"identifier in level and identifier",
			[ [ "upper" ], "lowerLevel" ],
		],
	],
)(
	"Target of %s, in stack, calls getLevelOrStackForTargetIdentifierOrItem for each identifier that returns an item and a level of two items, returns stack of two levels of one item and two items.",
	(targetDescription, targetLevelOrStack) => {
		const
			lowerLevel =
				[
					createTestItemWithIdentifier("upperLeft"),
					createTestItemWithIdentifier("upperRight"),
				],
			upper =
				createTestItemWithIdentifier("upper");

		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						switch (targetIdentifierOrItem) {
							case "lowerLevel":
								return lowerLevel;
							case upper.id:
								return upper;
							default:
								throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
						}
					},
				targetLevelOrStack,
			}),
		)
		.toEqual(
			[
				[ upper ],
				lowerLevel,
			],
		);
	},
);

test(
	"Target of identifier in level and identifier, in stack, calls getLevelOrStackForTargetIdentifierOrItem for each identifier that returns a level of two items and an item, returns stack of two levels of one item and two items.",
	() => {
		const
			lower =
				createTestItemWithIdentifier("lower"),
			upperLevel =
				[
					createTestItemWithIdentifier("upperLeft"),
					createTestItemWithIdentifier("upperRight"),
				];

		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						switch (targetIdentifierOrItem) {
							case lower.id:
								return lower;
							case "upperLevel":
								return upperLevel;
							default:
								throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
						}
					},
				targetLevelOrStack:
					[ [ "upperLevel" ], lower.id ],
			}),
		)
		.toEqual(
			[
				upperLevel,
				[ lower ],
			],
		);
	},
);

test(
	"Target of identifiers in two levels, in stack, calls getLevelOrStackForTargetIdentifierOrItem for each identifier that returns levels of two items, returns stack of two levels of two items each.",
	() => {
		const
			lowerLevel =
				[
					createTestItemWithIdentifier("upperLeft"),
					createTestItemWithIdentifier("upperRight"),
				],
			upperLevel =
				[
					createTestItemWithIdentifier("upperLeft"),
					createTestItemWithIdentifier("upperRight"),
				];

		expect(
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					targetIdentifierOrItem => {
						switch (targetIdentifierOrItem) {
							case "lowerLevel":
								return lowerLevel;
							case "upperLevel":
								return upperLevel;
							default:
								throw new Error(`getLevelOrStackForTargetIdentifierOrItem called with argument "${targetIdentifierOrItem}".`);
						}
					},
				targetLevelOrStack:
					[ [ "upperLevel" ], [ "lowerLevel" ] ],
			}),
		)
		.toEqual(
			[
				upperLevel,
				lowerLevel,
			],
		);
	},
);