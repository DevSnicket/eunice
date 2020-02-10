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
								{
									id: "childOfSecond",
									items: [ "firstGrandchildOfSecond", "secondGrandchildOfSecond" ],
								},
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
							items: [ "firstGrandchildOfSecond", "secondGrandchildOfSecond" ],
						}),
				}),
			];

	test(
		getName({
			stackDescription:
				"first depends upon two grandchildren in child in second",
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
									id: "childOfSecond",
									items:
										[ [
											{ id: "firstGrandchildOfSecond" },
											{ id: "secondGrandchildOfSecond" },
										] ],
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

		const childOfSecond = second.items[0][0];

		const
			[
				firstGrandchildOfSecond,
				secondGrandchildOfSecond,
			]
			=
			childOfSecond.items[0];

		first.dependsUpon =
			[
				{
					ancestors: [ childOfSecond, second ],
					item: firstGrandchildOfSecond,
					itemOrFirstAncestorItem: firstGrandchildOfSecond,
				},
				{
					ancestors: [ childOfSecond, second ],
					item: secondGrandchildOfSecond,
					itemOrFirstAncestorItem: secondGrandchildOfSecond,
				},
			];
		firstGrandchildOfSecond.dependents = [ first ];
		secondGrandchildOfSecond.dependents = [ first ];
	}
}