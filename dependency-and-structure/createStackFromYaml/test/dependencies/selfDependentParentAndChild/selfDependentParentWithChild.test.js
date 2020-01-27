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

	parent.dependsUpon =
		[ {
			item: parent,
			itemOrFirstAncestorItem: parent,
		} ];

	parent.dependents = [ parent ];

	return stack;
}