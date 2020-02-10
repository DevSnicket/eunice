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
										id: "missingChild1",
										items: "missingGrandchild1",
									},
									{
										id: "missingChild2",
										items: "missingGrandchild2",
									},
								],
						},
					id:
						"first",
				}),
				"second",
			];

	test(
		getName({
			stackDescription:
				"first depends upon two missing grandchildren in two missing children in second",
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
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		first.dependsUpon =
			[
				{
					ancestors: [ "missingChild1", second ],
					item: "missingGrandchild1",
					itemOrFirstAncestorItem: second,
				},
				{
					ancestors: [ "missingChild2", second ],
					item: "missingGrandchild2",
					itemOrFirstAncestorItem: second,
				},
			];

		second.dependents = [ first ];
	}
}