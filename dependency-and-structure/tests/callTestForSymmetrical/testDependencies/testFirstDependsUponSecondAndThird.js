/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../createItemYaml"),
	createStackFromLevels = require("../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon second and third",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							[
								"second",
								"third",
							],
						id:
							"first",
					}),
					"second",
					"third",
				],
		});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{ id: "second" },
					{ id: "third" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second, third ] = stack[0];

		first.dependsUpon =
			[
				{
					item: second,
					itemOrFirstAncestorItem: second,
				},
				{
					item: third,
					itemOrFirstAncestorItem: third,
				},
			];

		second.dependents = [ first ];
		third.dependents = [ first ];
	}
}