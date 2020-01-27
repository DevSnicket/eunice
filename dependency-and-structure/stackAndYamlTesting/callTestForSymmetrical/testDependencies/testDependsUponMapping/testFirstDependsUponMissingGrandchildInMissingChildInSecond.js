// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon missing grandchild in missing child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"second",
								items:
									{
										id: "missingChild",
										items: "missingGrandchild",
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
				ancestors: [ "missingChild", second ],
				item: "missingGrandchild",
				itemOrFirstAncestorItem: second,
			} ];

		second.dependents = [ first ];
	}
}