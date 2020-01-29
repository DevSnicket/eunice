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
							{
								id:
									"second",
								items:
									[
										{
											id: "firstChildOfSecond",
											items: "firstGrandchildOfSecond",
										},
										{
											id: "secondChildOfSecond",
											items: "secondGrandchildOfSecond",
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
							[
								createItemYaml({
									id: "firstChildOfSecond",
									items: "firstGrandchildOfSecond",
								}),
								createItemYaml({
									id: "secondChildOfSecond",
									items: "secondGrandchildOfSecond",
								}),
							],
					}),
				];

		test(
			getName({
				stackDescription:
					"first depends upon two grandchildren in two children in second",
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
							[ [
								{
									id: "firstChildOfSecond",
									items: [ [ { id: "firstGrandchildOfSecond" } ] ],
								},
								{
									id: "secondChildOfSecond",
									items: [ [ { id: "secondGrandchildOfSecond" } ] ],
								},
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

		const
			[
				firstGrandchildOfSecond,
				secondGrandchildOfSecond,
			]
			=
			[
				firstChildOfSecond.items[0][0],
				secondChildOfSecond.items[0][0],
			];

		first.dependsUpon =
			[
				{
					ancestors: [ firstChildOfSecond, second ],
					item: firstGrandchildOfSecond,
					itemOrFirstAncestorItem: firstGrandchildOfSecond,
				},
				{
					ancestors: [ secondChildOfSecond, second ],
					item: secondGrandchildOfSecond,
					itemOrFirstAncestorItem: secondGrandchildOfSecond,
				},
			];
		firstGrandchildOfSecond.dependents = [ first ];
		secondGrandchildOfSecond.dependents = [ first ];
	}
}