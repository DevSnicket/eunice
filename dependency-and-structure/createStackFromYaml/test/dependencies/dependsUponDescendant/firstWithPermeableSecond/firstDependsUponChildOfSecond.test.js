/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../../../testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			[
				createItemYaml({
					dependsUpon: "child",
					id: "first",
				}),
				createItemYaml({
					dependencyPermeable: true,
					id: "second",
					items: { id: "child" },
				}),
			],
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{
						dependencyPermeable: true,
						id: "second",
						items: [ [ { id: "child" } ] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const items = stack[0];

		const child = items[1].items[0][0];

		items[0].dependsUpon =
			[ {
				item: child,
				itemOrFirstAncestorItem: child,
			} ];

		child.dependents = [ items[0] ];
	}
}