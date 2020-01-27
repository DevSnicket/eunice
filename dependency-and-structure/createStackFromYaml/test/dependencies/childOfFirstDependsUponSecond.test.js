// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../stackAndYamlTesting/createItemYaml"),
	createStackFromLevels = require("../../../stackAndYamlTesting/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

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

		second.dependents = [ child ];
	}
}