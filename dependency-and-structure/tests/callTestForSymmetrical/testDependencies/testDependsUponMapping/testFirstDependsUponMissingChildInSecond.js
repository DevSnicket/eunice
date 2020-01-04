/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon missing child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id: "item2",
								items: "missing",
							},
						id:
							"item1",
					}),
					"item2",
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
				ancestors: [ level[1] ],
				item: "missing",
				itemOrFirstAncestorItem: level[1],
			} ];

		level[1].dependents = [ level[0] ];
	}
}