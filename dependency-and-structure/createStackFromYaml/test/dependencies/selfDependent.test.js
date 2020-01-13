/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../stackAndYamlTesting/createItemYaml"),
	createStackFromLevels = require("../../../stackAndYamlTesting/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

const identifier = "item";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		createItemYaml({
			dependsUpon: identifier,
			id: identifier,
		}),
});

function createStack() {
	const stack = createStackFromLevels([ [ { id: identifier } ] ]);

	addDependencies();

	return stack;

	function addDependencies() {
		const item = stack[0][0];

		item.dependsUpon =
			[ {
				item,
				itemOrFirstAncestorItem: item,
			} ];

		item.dependents = [ item ];
	}
}