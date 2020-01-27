// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test => {
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon child in second and second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							[
								"second",
								{
									id: "second",
									items: "childOfSecond",
								},
							],
						id:
							"first",
					}),
					createItemYaml({
						id: "second",
						items: "childOfSecond",
					}),
				],
		});
	};

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
					item: second,
					itemOrFirstAncestorItem: second,
				},
				{
					ancestors: [ second ],
					item: childOfSecond,
					itemOrFirstAncestorItem: childOfSecond,
				},
			];

		second.dependents = [ first ];
		childOfSecond.dependents = [ first ];
	}
}