// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackFromLevels from "../../../../stackAndYamlTesting/createStackFromLevels";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

const sameIdentifier = "same";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		createItemYaml({
			id: "parent",
			items:
				[
					createItemYaml({
						dependsUpon: { id: "parent", items: sameIdentifier },
						id: sameIdentifier,
					}),
				],
		}),
});

function createStack() {
	const stack =
		createStackFromLevels(
			[ [ {
				id: "parent",
				items: [ [ { id: sameIdentifier } ] ],
			} ] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const parent = stack[0][0];

		const dependent = parent.items[0][0];

		dependent.dependsUpon =
			[ {
				ancestors: [ parent ],
				item: sameIdentifier,
				itemOrFirstAncestorItem: parent,
			} ];

		parent.dependents = [ dependent ];
	}
}