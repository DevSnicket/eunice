// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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
			dependsUpon:
				sameIdentifier,
			id:
				sameIdentifier,
			items:
				createItemYaml({
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

		parent.dependsUpon =
			[ {
				item: child,
				itemOrFirstAncestorItem: child,
			} ];

		child.dependents = [ parent ];
	}
}