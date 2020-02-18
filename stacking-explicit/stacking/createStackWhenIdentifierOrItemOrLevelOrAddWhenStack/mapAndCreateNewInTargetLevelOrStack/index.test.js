// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import mapAndCreateNewInTargetLevelOrStack from ".";

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
			"Null in target level returns null.",
			() => {
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							() => null,
						targetLevelOrStack:
							[ null ],
					}),
				)
				.toBeNull();
			},
		);

		test(
			"Null in target stack returns null.",
			() => {
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							() => null,
						targetLevelOrStack:
							[ [ null ] ],
					}),
				)
				.toBeNull();
			},
		);

		test(
			"New empty object in target level returns empty object.",
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
			"Null and new empty object in target level returns empty object.",
			() => {
				const newInTarget = {};

				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							() => null,
						targetLevelOrStack:
							[ null, newInTarget ],
					}),
				)
				.toBe(
					newInTarget,
				);
			},
		);

		test(
			"New object with property in target level returns object with property.",
			() => {
				const newInTarget = { property: "value" };

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
			"New in target level with identifier and child item returns new in target with child item.",
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
			"New in target level with identifier and child items returns new in target with child items.",
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
			"New in target level with identifier and grandchild items returns new in target with grandchild items.",
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