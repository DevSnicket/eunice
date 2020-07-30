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
			];

	test(
		getName({
			stackDescription:
				"first depends upon child in second and second",
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

		second.dependents =
			[ { item: first } ];

		childOfSecond.dependents =
			[ { item: first } ];
	}
}