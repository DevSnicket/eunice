/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test => {
		const stack =
			createStackFromLevels(
				[
					[
						{ id: "item1" },
						{
							id: "item2",
							items:
								[
									[
										{ id: "child1" },
										{ id: "child2" },
									],
								],
						},
					],
				],
			);

		const level = stack[0];

		const children = level[1].items[0];

		level[0].dependsUpon =
			[
				{
					ancestor: level[1],
					item: children[0],
					itemOrFirstAncestorItem: children[0],
				},
				{
					ancestor: level[1],
					item: children[1],
					itemOrFirstAncestorItem: children[1],
				},
			];
		children[0].dependents = [ level[0] ];
		children[1].dependents = [ level[0] ];

		test({
			stack,
			stackDescription:
				"first depends upon two children in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id: "item2",
								items: [ "child1", "child2" ],
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
	};