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
				"first depends upon two children in second and second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							[
								"second",
								{
									id: "second",
									items: [ "firstChildOfSecond", "secondChildOfSecond" ],
								},
							],
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
					item: second,
					itemOrFirstAncestorItem: second,
				},
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

		second.dependents = [ first ];
		firstChildOfSecond.dependents = [ first ];
		secondChildOfSecond.dependents = [ first ];
	}
}