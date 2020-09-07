// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	addDirectionAndMutualStackToDependenciesInStack,
	createStackFromYaml,
} from "@devsnicket/eunice-dependency-and-structure";

import createIsDependencyOfItemRelevant from ".";

test(
	"dependency of empty item returns false",
	() =>
		expect(
			createIsDependencyOfItemRelevant({
				areAncestorsIncluded: false,
				levelDirection: null,
			})({
				dependency: { item: {} },
				item: null,
			}),
		)
		.toBe(false),
);

test(
	"dependency in stack of item's child items returns false",
	() => {
		const item = createStackOfItem({ items: {} })[0][0];

		expect(
			createIsDependencyOfItemRelevant({
				areAncestorsIncluded: false,
				levelDirection: null,
			})({
				dependency: { item: { level: { stack: item.items } } },
				item,
			}),
		)
		.toBe(false);
	},
);

describe(
	"dependency in parent/same stack",
	() => {
		const levelDirection = {};

		test.each(
			[
				[ "different", {}, false ],
				[ "same", levelDirection, true ],
			],
		)(
			"with %s level direction returns false",
			(
				description,
				dependencyLevelDirection,
				expected,
			) => {
				const stack = createStackOfItem({ items: {} });

				expect(
					createIsDependencyOfItemRelevant({
						areAncestorsIncluded: false,
						levelDirection,
					})({
						dependency:
							{
								direction: dependencyLevelDirection,
								mutualStack: stack,
							},
						item:
							stack[0][0],
					}),
				)
				.toBe(expected);
			},
		);
	},
);

describe(
	"dependency in ancestor stack with same level direction",
	() => {
		test.each(
			[ true, false ],
		)(
			"returns are ancestors included (%s)",
			areAncestorsIncluded => {
				const
					levelDirection = {},
					stack = createStackOfItem({ items: { items: {} } });

				expect(
					createIsDependencyOfItemRelevant({
						areAncestorsIncluded,
						levelDirection,
					})({
						dependency:
							{
								direction: levelDirection,
								mutualStack: stack,
							},
						item:
							stack[0][0].items[0][0],
					}),
				)
				.toBe(areAncestorsIncluded);
			},
		);
	},
);

function createStackOfItem(
	item,
) {
	const stack = createStackFromYaml(item);

	addDirectionAndMutualStackToDependenciesInStack(stack);

	return stack;
}