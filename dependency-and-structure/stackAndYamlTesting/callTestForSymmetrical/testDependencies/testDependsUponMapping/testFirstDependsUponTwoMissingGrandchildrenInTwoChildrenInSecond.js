// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../createItemYaml";
import createStackFromLevels from "../../../createStackFromLevels";

export default
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
			];

	test(
		getName({
			stackDescription:
				"first depends upon two missing grandchildren in two children in second",
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