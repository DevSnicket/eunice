// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackFromLevels = require("../../../../stackAndYamlTesting/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

const sameIdentifier = "same";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			createItemYaml({
				dependsUpon: sameIdentifier,
				id: sameIdentifier,
				otherIdentifier: "dependent",
			}),
			createItemYaml({
				id: sameIdentifier,
				otherIdentifier: "dependsUpon",
			}),
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[ [
				{
					id: sameIdentifier,
					otherIdentifier: "dependent",
				},
				{
					id: sameIdentifier,
					otherIdentifier: "dependsUpon",
				},
			] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ dependent, dependsUpon ] =
			stack[0];

		dependent.dependsUpon =
			[ {
				item: dependsUpon,
				itemOrFirstAncestorItem: dependsUpon,
			} ];

		dependsUpon.dependents = [ dependent ];
	}
}