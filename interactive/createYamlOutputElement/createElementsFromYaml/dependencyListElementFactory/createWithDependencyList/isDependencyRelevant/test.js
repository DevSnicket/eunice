const isDependencyRelevant = require(".");

test(
	"dependency of empty object returns false",
	() =>
		expect(
			isDependencyRelevant({
				dependency: {},
				findDirectionBetweenItemsInFirstMutualStack: null,
				isInnerStack: null,
				item: null,
				level: null,
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
				dependency: { level: { stack: item.items } },
				findDirectionBetweenItemsInFirstMutualStack: null,
				isInnerStack: null,
				item,
				level: null,
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
						dependency: { level: { stack: {} } },
						findDirectionBetweenItemsInFirstMutualStack: null,
						isInnerStack: () => true,
						item: { items: {} },
						level: null,
					}),
				)
				.toBe(false),
		);

		describe(
			"isInnerStack false",
			() => {
				test(
					"findDirectionBetweenItemsInFirstMutualStack direction is not level returns false",
					() =>
						expect(
							isDependencyRelevant({
								dependency:
									{ level: { stack: {} } },
								findDirectionBetweenItemsInFirstMutualStack:
									() => ({ direction: {} }),
								isInnerStack:
									() => false,
								item:
									{ items: {} },
								level:
									{},
							}),
						)
						.toBe(false),
				);

				test(
					"findDirectionBetweenItemsInFirstMutualStack direction is level returns true",
					() => {
						const level = {};

						expect(
							isDependencyRelevant({
								dependency:
									{ level: { stack: {} } },
								findDirectionBetweenItemsInFirstMutualStack:
									() => ({ direction: level }),
								isInnerStack:
									() => false,
								item:
									{ items: {} },
								level,
							}),
						)
						.toBe(true);
					},
				);
			},
		);
	},
);