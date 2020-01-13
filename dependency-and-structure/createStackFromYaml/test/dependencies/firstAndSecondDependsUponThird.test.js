/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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