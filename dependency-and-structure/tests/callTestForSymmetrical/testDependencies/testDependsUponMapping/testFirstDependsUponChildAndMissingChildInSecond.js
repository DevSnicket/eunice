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
							items: [ [ { id: "child" } ] ],
						},
					],
				],
			);

		const level = stack[0];

		const child = level[1].items[0][0];

		level[0].dependsUpon =
			[
				{
					ancestor: level[1],
					item: child,
				},
				{
					ancestors: [ level[1] ],
					item: "missingChild",
				},
			];
		child.dependents = [ level[0] ];

		test({
			stack,
			stackDescription:
				"first depends upon child and missing child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id: "item2",
								items: [ "child", "missingChild" ],
							},
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