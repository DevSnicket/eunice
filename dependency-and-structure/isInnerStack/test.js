/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const isInnerStack = require("./");

test(
	"Same object returns false",
	() => {
		const same = {};

		expect(
			isInnerStack({
				source: same,
				target: same,
			}),
		)
		.toBe(false);
	},
);

test(
	"Different objects returns false",
	() =>
		expect(
			isInnerStack({
				source: {},
				target: {},
			}),
		)
		.toBe(false),
);

test(
	"From parent to child returns true",
	() => {
		const parent = {};

		const child = createStackWithParent(parent);

		expect(
			isInnerStack({
				source: parent,
				target: child,
			}),
		)
		.toBe(true);
	},
);

test(
	"From grandparent to grandchild returns true",
	() => {
		const grandparent = {};

		const grandchild =
			createStackWithParent(
				createStackWithParent(
					grandparent,
				),
			);

		expect(
			isInnerStack({
				source: grandparent,
				target: grandchild,
			}),
		)
		.toBe(true);
	},
);

function createStackWithParent(
	parent,
) {
	return { parent: { level: { stack: parent } } };
}