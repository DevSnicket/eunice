// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackAndGetParentAndChild from "./createStackAndGetParentAndChild";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		createItemYaml({
			dependsUpon: "child",
			id: "parent",
			items: "child",
		}),
});

function createStack() {
	const { child, parent, stack } = createStackAndGetParentAndChild();

	parent.dependsUpon =
		[ {
			item: child,
			itemOrFirstAncestorItem: child,
		} ];

	child.dependents =
		[ { item: parent } ];

	return stack;
}