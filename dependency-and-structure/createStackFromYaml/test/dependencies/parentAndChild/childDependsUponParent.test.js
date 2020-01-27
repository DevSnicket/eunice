// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackAndGetParentAndChild = require("./createStackAndGetParentAndChild"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

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