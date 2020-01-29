// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../createItemYaml"),
	createStackAndGetFirstAndSecond = require("./createStackAndGetFirstAndSecond");

module.exports =
	/** @type {import("../../Parameter.d")} */
	({
		getActual,
		getExpected,
		getName,
	}) => {
		const
			stack =
				createStack(),
			yaml =
				[
					createItemYaml({
						dependsUpon: "second",
						id: "first",
					}),
					"second",
				];

		test(
			getName({
				stackDescription:
					"first depends upon second",
				yaml,
			}),
			() =>
				expect(
					getActual({ stack, yaml }),
				)
				.toEqual(
					getExpected({ stack, yaml }),
				),
		);
	};

function createStack() {
	const { first, second, stack } = createStackAndGetFirstAndSecond();

	first.dependsUpon =
		[ {
			item: second,
			itemOrFirstAncestorItem: second,
		} ];
	second.dependents =
		[ first ];

	return stack;
}