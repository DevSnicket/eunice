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
				"first depends upon missing great grandchild in missing grandchild in missing child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"second",
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
							"first",
					}),
					"second",
				],
		});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{ id: "second" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		first.dependsUpon =
			[ {
				ancestors: [ "missingGrandchild", "missingChild", second ],
				item: "missingGreatGrandchild",
				itemOrFirstAncestorItem: second,
			} ];

		second.dependents = [ first ];
	}
}