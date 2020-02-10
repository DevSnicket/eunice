// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../stackAndYamlTesting/createItemYaml";
import createStackFromLevels from "../../../stackAndYamlTesting/createStackFromLevels";
import testCreateStackFromYaml from "../testCreateStackFromYaml";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			createItemYaml({
				dependsUpon: "third",
				id: "first",
			}),
			createItemYaml({
				dependsUpon: "third",
				id: "second",
			}),
			"third",
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{ id: "second" },
					{ id: "third" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second, third ] = stack[0];

		first.dependsUpon =
			[ {
				item: third,
				itemOrFirstAncestorItem: third,
			} ];
		second.dependsUpon =
			[ {
				item: third,
				itemOrFirstAncestorItem: third,
			} ];

		third.dependents = [ first, second ];
	}
}