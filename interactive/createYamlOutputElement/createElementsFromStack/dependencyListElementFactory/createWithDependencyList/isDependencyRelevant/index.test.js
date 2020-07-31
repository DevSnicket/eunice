// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import isDependencyRelevant from ".";

test(
	"dependency of empty item returns false",
	() =>
		expect(
			isDependencyRelevant({
				dependency: { item: {} },
				isInnerStack: null,
				item: null,
				levelDirection: null,
			}),
		)
		.toBe(false),
);

test(
	"dependency in stack of item's child items returns false",
	() => {
		const item = { items: {} };

		expect(
			isDependencyRelevant({
				dependency: { item: { level: { stack: item.items } } },
				isInnerStack: null,
				item,
				levelDirection: null,
			}),
		)
		.toBe(false);
	},
);

describe(
	"dependency in stack thats not item's child items",
	() => {
		test(
			"isInnerStack true returns false",
			() =>
				expect(
					isDependencyRelevant({
						dependency: { item: { level: { stack: {} } } },
						isInnerStack: () => true,
						item: { items: {} },
						levelDirection: null,
					}),
				)
				.toBe(false),
		);

		describe(
			"isInnerStack false",
			() => {
				test(
					"direction is not level returns false",
					() =>
						expect(
							isDependencyRelevant({
								dependency:
									{
										direction: {},
										item: { level: { stack: {} } },
									},
								isInnerStack:
									() => false,
								item:
									{ items: {} },
								levelDirection:
									{},
							}),
						)
						.toBe(false),
				);

				test(
					"direction is level returns true",
					() => {
						const levelDirection = {};

						expect(
							isDependencyRelevant({
								dependency:
									{
										direction: levelDirection,
										item: { level: { stack: {} } },
									},
								isInnerStack:
									() => false,
								item:
									{ items: {} },
								levelDirection,
							}),
						)
						.toBe(true);
					},
				);
			},
		);
	},
);