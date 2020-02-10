// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackAndGetParentAndChild from "./createStackAndGetParentAndChild";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		{
			id:
				"parent",
			items:
				createItemYaml({
					dependsUpon: "parent",
					id: "child",
				}),
		},
});

function createStack() {
	const { child, parent, stack } = createStackAndGetParentAndChild();

	child.dependsUpon =
		[ {
			item: parent,
			itemOrFirstAncestorItem: parent,
		} ];

	parent.dependents = [ child ];

	return stack;
}