/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
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