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
				"first depends upon two grandchildren in child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"item2",
								items:
									{
										id: "child",
										items: [ "grandchild1", "grandchild2" ],
									},
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
								items: [ "grandchild1", "grandchild2" ],
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
							[ [
								{
									id: "child",
									items:
										[ [
											{ id: "grandchild1" },
											{ id: "grandchild2" },
										] ],
								},
							] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const level = stack[0];

		const
			grandchildren =
				[
					level[1].items[0][0].items[0][0],
					level[1].items[0][0].items[0][1],
				];

		level[0].dependsUpon =
			[
				{
					ancestor: level[1],
					item: grandchildren[0],
					itemOrFirstAncestorItem: grandchildren[0],
				},
				{
					ancestor: level[1],
					item: grandchildren[1],
					itemOrFirstAncestorItem: grandchildren[1],
				},
			];
		grandchildren[0].dependents = [ level[0] ];
		grandchildren[1].dependents = [ level[0] ];
	}
}