// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackFromLevels from "../../../../stackAndYamlTesting/createStackFromLevels";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

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