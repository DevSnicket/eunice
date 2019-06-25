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
				{ item: level[1] },
				{ ancestor: level[1], item: child },
			];

		level[1].dependents = [ level[0] ];
		child.dependents = [ level[0] ];

		test({
			stack,
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