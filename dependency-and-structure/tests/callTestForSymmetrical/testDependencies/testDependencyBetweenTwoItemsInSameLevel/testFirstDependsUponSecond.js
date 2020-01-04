/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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