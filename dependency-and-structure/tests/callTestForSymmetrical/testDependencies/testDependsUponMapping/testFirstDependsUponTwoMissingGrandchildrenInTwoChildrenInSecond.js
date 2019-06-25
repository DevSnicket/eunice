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
								[ [
									{ id: "child1" },
									{ id: "child2" },
								] ],
						},
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon =
			[
				{
					ancestors: [ level[1].items[0][0], level[1] ],
					item: "missingGrandchild1",
				},
				{
					ancestors: [ level[1].items[0][1], level[1] ],
					item: "missingGrandchild2",
				},
			];

		test({
			stack,
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
	};