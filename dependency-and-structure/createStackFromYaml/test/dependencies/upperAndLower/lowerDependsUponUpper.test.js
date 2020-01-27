// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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