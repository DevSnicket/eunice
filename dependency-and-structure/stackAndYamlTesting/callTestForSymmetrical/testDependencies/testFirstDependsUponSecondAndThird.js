// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../createItemYaml";
import createStackFromLevels from "../../createStackFromLevels";

export default
/** @type {import("../Parameter.d")} */
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
							"third",
						],
					id:
						"first",
				}),
				"second",
				"third",
			];

	test(
		getName({
			stackDescription:
				"first depends upon second and third",
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
					{ id: "second" },
					{ id: "third" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second, third ] = stack[0];

		first.dependsUpon =
			[
				{
					item: second,
					itemOrFirstAncestorItem: second,
				},
				{
					item: third,
					itemOrFirstAncestorItem: third,
				},
			];

		second.dependents = [ first ];
		third.dependents = [ first ];
	}
}