// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import findDirectionBetweenItemsInFirstMutualStack from ".";

test(
	"same item returns direction of self and the item's stack",
	() => {
		const stack = createStackWithoutImplementation();

		const item = { level: { stack } };

		expect(
			findDirectionBetweenItemsInFirstMutualStack({
				from: item,
				to: item,
			}),
		)
		.toEqual(
			{
				direction: "self",
				mutualStack: stack,
			},
		);
	},
);

test(
	"same level returns direction of same and the level's stack",
	() => {
		const stack = createStackWithoutImplementation();

		const level = { stack };

		expect(
			findDirectionBetweenItemsInFirstMutualStack({
				from: { level },
				to: { level },
			}),
		)
		.toEqual(
			{
				direction: "same",
				mutualStack: stack,
			},
		);
	},
);

describe(
	"same stack",
	() => {
		test(
			"\"to\" is below \"from\" returns direction of below and same stack",
			() => {
				const stack = [];

				const levels =
					{
						from: { stack },
						to: { stack },
					};

				stack.push(
					levels.from,
					levels.to,
				);

				expect(
					findDirectionBetweenItemsInFirstMutualStack({
						from: { level: levels.from },
						to: { level: levels.to },
					}),
				)
				.toEqual(
					{
						direction: "below",
						mutualStack: stack,
					},
				);
			},
		);

		test(
			"\"to\" is above \"from\" returns direction of above and same stack",
			() => {
				const stack = [];

				const levels =
					{
						from: { stack },
						to: { stack },
					};

				stack.push(
					levels.to,
					levels.from,
				);

				expect(
					findDirectionBetweenItemsInFirstMutualStack({
						from: { level: levels.from },
						to: { level: levels.to },
					}),
				)
				.toEqual(
					{
						direction: "above",
						mutualStack: stack,
					},
				);
			},
		);
	},
);

describe(
	"parent",
	() => {
		test(
			"\"to\" is child of \"from\" returns direction of below and stack of items of \"from\"",
			() => {
				const from = createItemWithoutImplementation();

				expect(
					findDirectionBetweenItemsInFirstMutualStack({
						from,
						to: createItemWithParent(from),
					}),
				)
				.toEqual(
					{
						direction: "below",
						mutualStack: from.items,
					},
				);
			},
		);

		test(
			"\"to\" is parent of \"from\" returns direction of above and stack of items of \"to\"",
			() => {
				const to = createItemWithoutImplementation();

				expect(
					findDirectionBetweenItemsInFirstMutualStack({
						from: createItemWithParent(to),
						to,
					}),
				)
				.toEqual(
					{
						direction: "above",
						mutualStack: to.items,
					},
				);
			},
		);
	},
);

describe(
	"parent",
	() =>
		testAncestor({
			createItemWithAncestor: createItemWithParent,
			descendantDescription: "child",
		}),
);

describe(
	"grandparent",
	() =>
		testAncestor({
			createItemWithAncestor:
				ancestor =>
					createItemWithParent(
						createItemWithParent(
							ancestor,
						),
					),
			descendantDescription:
				"grandchild",
		}),
);

describe(
	"great grandparent",
	() =>
		testAncestor({
			createItemWithAncestor:
				ancestor =>
					createItemWithParent(
						createItemWithParent(
							createItemWithParent(
								ancestor,
							),
						),
					),
			descendantDescription:
				"great grandchild",
		}),
);


test(
	"No mutual ancestor throws error",
	() =>
		expect(
			() =>
				findDirectionBetweenItemsInFirstMutualStack({
					from: { level: { stack: createStackWithoutImplementation() } },
					to: { level: { stack: createStackWithoutImplementation() } },
				}),
		)
		.toThrowError("Could not find direction between items in first mutual stack."),
);

/**
  * @param {import("./Parameter.d").Item} parent
  * @returns {import("./Parameter.d").Item}
  */
function createItemWithParent(
	parent,
) {
	return { level: { stack: createStack() } };

	function createStack() {
		return (
			{
				indexOf: null,
				parent,
			}
		);
	}
}

function testAncestor({
	createItemWithAncestor,
	descendantDescription,
}) {
	test(
		`"to" is ${descendantDescription} of "from" returns direction of below and stack of items of "from"`,
		() => {
			const from = createItemWithoutImplementation();

			expect(
				findDirectionBetweenItemsInFirstMutualStack({
					from,
					to: createItemWithAncestor(from),
				}),
			)
			.toEqual(
				{
					direction: "below",
					mutualStack: from.items,
				},
			);
		},
	);

	test(
		`to" is ${descendantDescription} of "from" returns direction of above and stack of items of "to"`,
		() => {
			const to = createItemWithoutImplementation();

			expect(
				findDirectionBetweenItemsInFirstMutualStack({
					from: createItemWithAncestor(to),
					to,
				}),
			)
			.toEqual(
				{
					direction: "above",
					mutualStack: to.items,
				},
			);
		},
	);
}

function createItemWithoutImplementation() {
	return { level: { stack: createStackWithoutImplementation() } };
}

function createStackWithoutImplementation() {
	return { indexOf: null };
}