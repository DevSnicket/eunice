/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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