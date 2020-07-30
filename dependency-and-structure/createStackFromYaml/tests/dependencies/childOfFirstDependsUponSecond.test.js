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
				id: "first",
				items:
					createItemYaml({
						dependsUpon: "second",
						id: "child",
					}),
			}),
			"second",
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{
						id: "first",
						items: [ [ { id: "child" } ] ],
					},
					{ id: "second" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const child = first.items[0][0];

		child.dependsUpon =
			[ {
				item: second,
				itemOrFirstAncestorItem: second,
			} ];

		second.dependents =
			[ { item: child } ];
	}
}