/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../tests/createItemYaml"),
	createParentChildLevels = require("../../../tests/createParentChildLevels"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		testParentDependsUponChild();
		testChildDependsUponParent();
	};

function testParentDependsUponChild() {
	testCreateStackFromYaml({
		stack:
			createStackWithDependencies(),
		stackDescription:
			"parent depends upon child",
		yaml:
			createItemYaml({
				dependsUpon: "child",
				id: "parent",
				items: "child",
			}),
	});

	function createStackWithDependencies() {
		const { child, parent, stack } = createStackAndGetParentAndChild();

		parent.dependsUpon = [ { item: child } ];
		child.dependents = [ parent ];

		return stack;
	}
}

function testChildDependsUponParent() {
	testCreateStackFromYaml({
		stack:
			createStackWithDependencies(),
		stackDescription:
			"child depends upon parent",
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

	function createStackWithDependencies() {
		const { child, parent, stack } = createStackAndGetParentAndChild();

		child.dependsUpon = [ { item: parent } ];
		parent.dependents = [ child ];

		return stack;
	}
}

function createStackAndGetParentAndChild() {
	const stack = createStackFromLevels(createParentChildLevels());

	const parent = stack[0][0];

	return (
		{
			child: parent.items[0][0],
			parent,
			stack,
		}
	);
}