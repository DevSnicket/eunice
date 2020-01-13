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