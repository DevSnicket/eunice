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
				"first depends upon child and missing child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id: "second",
								items: [ "childOfSecond", "missingChild" ],
							},
						id:
							"first",
					}),
					createItemYaml({
						id: "second",
						items: "childOfSecond",
					}),
				],
		});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{
						id: "second",
						items: [ [ { id: "childOfSecond" } ] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const childOfSecond = second.items[0][0];

		first.dependsUpon =
			[
				{
					ancestors: [ second ],
					item: childOfSecond,
					itemOrFirstAncestorItem: childOfSecond,
				},
				{
					ancestors: [ second ],
					item: "missingChild",
					itemOrFirstAncestorItem: second,
				},
			];

		childOfSecond.dependents = [ first ];
		second.dependents = [ first ];
	}
}