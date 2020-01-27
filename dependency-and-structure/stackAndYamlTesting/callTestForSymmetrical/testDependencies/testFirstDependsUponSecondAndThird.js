// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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