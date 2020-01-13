/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackAndGetUpperAndLower = require("./createStackAndGetUpperAndLower"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			[ "upper" ],
			[
				createItemYaml({
					dependsUpon: "upper",
					id: "lower",
				}),
			],
		],
});

function createStack() {
	const { lower, stack, upper } = createStackAndGetUpperAndLower();

	lower.dependsUpon =
		[ {
			item: upper,
			itemOrFirstAncestorItem: upper,
		} ];

	upper.dependents = [ lower ];

	return stack;
}