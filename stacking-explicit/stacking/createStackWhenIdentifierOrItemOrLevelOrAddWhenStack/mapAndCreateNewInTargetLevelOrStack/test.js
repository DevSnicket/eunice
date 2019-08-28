// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const mapAndCreateNewInTargetLevelOrStack = require(".");

test(
	"New in target with add new in target false returns null.",
	() =>
		expect(
			mapAndCreateNewInTargetLevelOrStack({
				addNewInTarget:
					false,
				getLevelOrStackForTargetIdentifierOrItem:
					() => null,
				targetLevelOrStack:
					[ "newInTarget" ],
			}),
		)
		.toBeNull(),
);

describe(
	"With add new in target true",
	() => {
		test(
			"New in target with no items returns new in target.",
			() => {
				const newInTarget = {};

				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							() => null,
						targetLevelOrStack:
							[ newInTarget ],
					}),
				)
				.toBe(
					newInTarget,
				);
			},
		);

		test(
			"New in target with child item returns new in target with child item.",
			() =>
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							item =>
								item === "childInTarget" && "child",
						targetLevelOrStack:
							[ {
								id: "parent",
								items: "childInTarget",
							} ],
					}),
				)
				.toEqual({
					id: "parent",
					items: "child",
				}),
		);

		test(
			"New in target with child items returns new in target with child items.",
			() =>
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							item =>
								item === "childInTarget" && "child",
						targetLevelOrStack:
							[ {
								id: "parent",
								items: [ "childInTarget" ],
							} ],
					}),
				)
				.toEqual({
					id: "parent",
					items: "child",
				}),
		);

		test(
			"New in target with grandchild items returns new in target with grandchild items.",
			() =>
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							item =>
								item === "grandchildInTarget" && "grandchild",
						targetLevelOrStack:
							[ {
								id:
									"grandparent",
								items:
									{
										id: "parent",
										items: [ "grandchildInTarget" ],
									},
							} ],
					}),
				)
				.toEqual({
					id: "grandparent",
					items: { id: "parent", items: "grandchild" },
				}),
		);
	},
);