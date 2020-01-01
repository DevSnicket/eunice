/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
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