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
				dependsUpon: "item3",
				id: "item1",
			}),
			createItemYaml({
				dependsUpon: "item3",
				id: "item2",
			}),
			"item3",
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "item1" },
					{ id: "item2" },
					{ id: "item3" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const level = stack[0];

		level[0].dependsUpon =
			[ {
				item: level[2],
				itemOrFirstAncestorItem: level[2],
			} ];
		level[1].dependsUpon =
			[ {
				item: level[2],
				itemOrFirstAncestorItem: level[2],
			} ];

		level[2].dependents = [ level[0], level[1] ];
	}
}