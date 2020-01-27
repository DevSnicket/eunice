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
				"first depends upon grandchild in second and child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"second",
								items:
									[
										"childOfSecond",
										{
											id: "childOfSecond",
											items: "grandchildOfSecond",
										},
									],
							},
						id:
							"first",
					}),
					createItemYaml({
						id:
							"second",
						items:
							createItemYaml({
								id: "childOfSecond",
								items: "grandchildOfSecond",
							}),
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
						items:
							[ [ {
								id: "childOfSecond",
								items: [ [ { id: "grandchildOfSecond" } ] ],
							} ] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const childOfSecond = second.items[0][0];

		const grandchildOfSecond = childOfSecond.items[0][0];

		first.dependsUpon =
			[
				{
					ancestors: [ second ],
					item: childOfSecond,
					itemOrFirstAncestorItem: childOfSecond,
				},
				{
					ancestors: [ childOfSecond, second ],
					item: grandchildOfSecond,
					itemOrFirstAncestorItem: grandchildOfSecond,
				},
			];
		grandchildOfSecond.dependents = [ first ];
		childOfSecond.dependents = [ first ];
	}
}