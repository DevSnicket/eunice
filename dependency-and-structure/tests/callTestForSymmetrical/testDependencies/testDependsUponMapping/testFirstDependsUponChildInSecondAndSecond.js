/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test => {
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon child in second and second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							[
								"item2",
								{
									id: "item2",
									items: "child",
								},
							],
						id:
							"item1",
					}),
					createItemYaml({
						id: "item2",
						items: "child",
					}),
				],
		});
	};

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "item1" },
					{
						id: "item2",
						items: [ [ { id: "child" } ] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const level = stack[0];

		const child = level[1].items[0][0];

		level[0].dependsUpon =
			[
				{
					item: level[1],
					itemOrFirstAncestorItem: level[1],
				},
				{
					ancestors: [ level[1] ],
					item: child,
					itemOrFirstAncestorItem: child,
				},
			];

		level[1].dependents = [ level[0] ];
		child.dependents = [ level[0] ];
	}
}