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
				"first depends upon two missing grandchildren in two children in second",
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
											id: "child1",
											items: "missingGrandchild1",
										},
										{
											id: "child2",
											items: "missingGrandchild2",
										},
									],
							},
						id:
							"item1",
					}),
					createItemYaml({
						id: "item2",
						items: [ "child1", "child2" ],
					}),
				],
		});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "item1" },
					{
						id: "item2",
						items:
							[ [
								{ id: "child1" },
								{ id: "child2" },
							] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const level = stack[0];

		const child = level[1].items[0];

		level[0].dependsUpon =
			[
				{
					ancestors: [ child[0], level[1] ],
					item: "missingGrandchild1",
					itemOrFirstAncestorItem: child[0],
				},
				{
					ancestors: [ child[1], level[1] ],
					item: "missingGrandchild2",
					itemOrFirstAncestorItem: child[1],
				},
			];

		child[0].dependents = [ level[0] ];
		child[1].dependents = [ level[0] ];
	}
}