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
						{ id: "item2" },
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon =
			[ {
				ancestors: [ "missingGrandchild", "missingChild", level[1] ],
				item: "missingGreatGrandchild",
			} ];

		level[1].dependents = [ level[0] ];

		test({
			stack,
			stackDescription:
				"first depends upon missing great grandchild in missing grandchild in missing child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"item2",
								items:
									{
										id:
											"missingChild",
										items:
											{
												id: "missingGrandchild",
												items: "missingGreatGrandchild",
											},
									},
							},
						id:
							"item1",
					}),
					"item2",
				],
		});
	};