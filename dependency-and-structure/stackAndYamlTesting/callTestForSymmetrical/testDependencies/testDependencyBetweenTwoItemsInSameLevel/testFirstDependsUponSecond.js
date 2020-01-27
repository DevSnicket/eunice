// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../createItemYaml"),
	createStackAndGetFirstAndSecond = require("./createStackAndGetFirstAndSecond");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon second",
			yaml:
				[
					createItemYaml({
						dependsUpon: "second",
						id: "first",
					}),
					"second",
				],
		});

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