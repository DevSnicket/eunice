// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackFromLevels = require("../../../../stackAndYamlTesting/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			[
				createItemYaml({
					dependsUpon: { id: "second" },
					id: "first",
				}),
				"second",
			],
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{ id: "second" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		first.dependsUpon =
			[ {
				item: second,
				itemOrFirstAncestorItem: second,
			} ];

		second.dependents = [ first ];
	}
}