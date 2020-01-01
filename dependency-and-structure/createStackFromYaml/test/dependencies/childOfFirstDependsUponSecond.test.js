/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
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
		const level = stack[0];

		const child = level[0].items[0][0];

		child.dependsUpon =
			[ {
				item: level[1],
				itemOrFirstAncestorItem: level[1],
			} ];

		level[1].dependents = [ child ];
	}
}