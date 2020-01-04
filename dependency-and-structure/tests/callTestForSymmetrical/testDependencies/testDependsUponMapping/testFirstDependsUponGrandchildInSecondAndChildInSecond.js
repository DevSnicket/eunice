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
				"first depends upon grandchild in second and child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"item2",
								items:
									[
										"child",
										{
											id: "child",
											items: "grandchild",
										},
									],
							},
						id:
							"item1",
					}),
					createItemYaml({
						id:
							"item2",
						items:
							createItemYaml({
								id: "child",
								items: "grandchild",
							}),
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
							[ [ {
								id: "child",
								items: [ [ { id: "grandchild" } ] ],
							} ] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const level = stack[0];

		const child = level[1].items[0][0];

		const grandchild = child.items[0][0];

		level[0].dependsUpon =
			[
				{
					ancestors: [ level[1] ],
					item: child,
					itemOrFirstAncestorItem: child,
				},
				{
					ancestors: [ child, level[1] ],
					item: grandchild,
					itemOrFirstAncestorItem: grandchild,
				},
			];
		grandchild.dependents = [ level[0] ];
		child.dependents = [ level[0] ];
	}
}