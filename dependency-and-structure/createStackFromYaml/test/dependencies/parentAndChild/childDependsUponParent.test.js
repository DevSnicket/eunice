/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
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