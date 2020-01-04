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
				"first depends upon two missing grandchildren in two missing children in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"item2",
								items:
									[
										{
											id: "missingChild1",
											items: "missingGrandchild1",
										},
										{
											id: "missingChild2",
											items: "missingGrandchild2",
										},
									],
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
			[
				{
					ancestors: [ "missingChild1", level[1] ],
					item: "missingGrandchild1",
					itemOrFirstAncestorItem: level[1],
				},
				{
					ancestors: [ "missingChild2", level[1] ],
					item: "missingGrandchild2",
					itemOrFirstAncestorItem: level[1],
				},
			];

		level[1].dependents = [ level[0] ];
	}
}