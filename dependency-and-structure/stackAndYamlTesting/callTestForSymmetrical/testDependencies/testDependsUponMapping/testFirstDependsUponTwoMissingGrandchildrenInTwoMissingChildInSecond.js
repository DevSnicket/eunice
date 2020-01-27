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
				"first depends upon two missing grandchildren in two missing children in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"second",
								items:
									[
										{
											id: "missingChild1",
											items: "missingGrandchild1",
										},
										{
											id: "missingChild2",
											items: "missingGrandchild2",
										},
									],
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
			[
				{
					ancestors: [ "missingChild1", second ],
					item: "missingGrandchild1",
					itemOrFirstAncestorItem: second,
				},
				{
					ancestors: [ "missingChild2", second ],
					item: "missingGrandchild2",
					itemOrFirstAncestorItem: second,
				},
			];

		second.dependents = [ first ];
	}
}