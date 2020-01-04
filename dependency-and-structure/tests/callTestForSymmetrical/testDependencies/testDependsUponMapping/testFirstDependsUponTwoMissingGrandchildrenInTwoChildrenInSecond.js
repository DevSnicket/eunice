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
				"first depends upon two missing grandchildren in two children in second",
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
											id: "firstChildOfSecond",
											items: "missingGrandchild1",
										},
										{
											id: "secondChildOfSecond",
											items: "missingGrandchild2",
										},
									],
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
							[ [
								{ id: "firstChildOfSecond" },
								{ id: "secondChildOfSecond" },
							] ],
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
					ancestors: [ firstChildOfSecond, second ],
					item: "missingGrandchild1",
					itemOrFirstAncestorItem: firstChildOfSecond,
				},
				{
					ancestors: [ secondChildOfSecond, second ],
					item: "missingGrandchild2",
					itemOrFirstAncestorItem: secondChildOfSecond,
				},
			];

		firstChildOfSecond.dependents = [ first ];
		secondChildOfSecond.dependents = [ first ];
	}
}