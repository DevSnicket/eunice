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
				"second depends upon first",
			yaml:
				[
					"first",
					createItemYaml({
						dependsUpon: "first",
						id: "second",
					}),
				],
		});

function createStack() {
	const { first, second, stack } = createStackAndGetFirstAndSecond();

	second.dependsUpon =
		[ {
			item: first,
			itemOrFirstAncestorItem: first,
		} ];
	first.dependents =
		[ second ];

	return stack;
}