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
									{
										id: "childOfSecond",
										items: "missingGrandchild",
									},
							},
						id:
							"first",
					}),
					createItemYaml({
						id: "second",
						items: "childOfSecond",
					}),
				];

		test(
			getName({
				stackDescription:
					"first depends upon missing grandchild in second",
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
			[ {
				ancestors: [ childOfSecond, second ],
				item: "missingGrandchild",
				itemOrFirstAncestorItem: childOfSecond,
			} ];

		childOfSecond.dependents = [ first ];
	}
}