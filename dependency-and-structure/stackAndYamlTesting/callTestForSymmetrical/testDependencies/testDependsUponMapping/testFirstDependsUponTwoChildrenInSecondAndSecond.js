// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	/** @type {import("../../Parameter.d")} */
	({
		getActual,
		getExpected,
		getName,
	}) => {
		const
			stack =
				createStack(),
			yaml =
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
				];

		test(
			getName({
				stackDescription:
					"first depends upon two children in second and second",
				yaml,
			}),
			() =>
				expect(
					getActual({ stack, yaml }),
				)
				.toEqual(
					getExpected({ stack, yaml }),
				),
		);
	};

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