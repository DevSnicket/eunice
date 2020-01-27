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
				"first depends upon two children in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id: "second",
								items: [ "firstChildOfSecond", "secondChildOfSecond" ],
							},
						id:
							"first",
					}),
					createItemYaml({
						id: "second",
						items: [ "firstChildOfSecond", "secondChildOfSecond" ],
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
							[
								[
									{ id: "firstChildOfSecond" },
									{ id: "secondChildOfSecond" },
								],
							],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const
			[
				firstChildOfSecond,
				secondChildOfSecond,
			]
			=
			second.items[0];

		first.dependsUpon =
			[
				{
					ancestors: [ second ],
					item: firstChildOfSecond,
					itemOrFirstAncestorItem: firstChildOfSecond,
				},
				{
					ancestors: [ second ],
					item: secondChildOfSecond,
					itemOrFirstAncestorItem: secondChildOfSecond,
				},
			];
		firstChildOfSecond.dependents = [ first ];
		secondChildOfSecond.dependents = [ first ];
	}
}