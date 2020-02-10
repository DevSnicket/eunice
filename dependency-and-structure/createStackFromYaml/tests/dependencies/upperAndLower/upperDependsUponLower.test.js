// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackAndGetUpperAndLower from "./createStackAndGetUpperAndLower";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			[
				createItemYaml({
					dependsUpon: "lower",
					id: "upper",
				}),
			],
			[ "lower" ],
		],
});

function createStack() {
	const { lower, stack, upper } = createStackAndGetUpperAndLower();

	upper.dependsUpon =
		[ {
			item: lower,
			itemOrFirstAncestorItem: lower,
		} ];

	lower.dependents = [ upper ];

	return stack;
}