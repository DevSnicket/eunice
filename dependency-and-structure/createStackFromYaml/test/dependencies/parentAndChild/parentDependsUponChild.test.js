// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackAndGetParentAndChild = require("./createStackAndGetParentAndChild"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

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

	child.dependents = [ parent ];

	return stack;
}