/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			[
				createItemYaml({
					dependsUpon: { id: "item2" },
					id: "item1",
				}),
				"item2",
			],
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "item1" },
					{ id: "item2" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const level = stack[0];

		level[0].dependsUpon =
			[ {
				item: level[1],
				itemOrFirstAncestorItem: level[1],
			} ];

		level[1].dependents = [ level[0] ];
	}
}