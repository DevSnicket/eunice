/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackWithIdentifierAndGetParent = require("./createStackWithIdentifierAndGetParent"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

const sameIdentifier = "same";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		createItemYaml({
			id:
				sameIdentifier,
			items:
				createItemYaml({
					dependsUpon: sameIdentifier,
					id: sameIdentifier,
					otherIdentifier: "child",
				}),
			otherIdentifier:
				"parent",
		}),
});

function createStack() {
	const { parent, stack } =
		createStackWithIdentifierAndGetParent(
			sameIdentifier,
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const child = parent.items[0][0];

		child.dependsUpon =
			[ {
				item: child,
				itemOrFirstAncestorItem: child,
			} ];

		child.dependents = [ child ];
	}
}