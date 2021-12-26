// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../createItemYaml";
import createStackFromLevels from "../../../../createStackFromLevels";

export default
/** @type {import("../../../Parameter.d")} */
({
	getActual,
	getExpected,
	getName,
}) => {
	const
		stack =
			createStack(),
		yaml =
			createItemYaml({
				id:
					"parent",
				items:
					[
						createItemYaml({
							dependsUpon:
								{
									id:
										"parent",
									items:
										{
											id: "second",
											items: "grandchildOfSecond",
										},
								},
							id:
								"first",
						}),
						createItemYaml({
							id:
								"second",
							items:
								{
									dependencyPermeable: true,
									id: "childOfSecond",
									items: "grandchildOfSecond",
								},
						}),
					],
			});

	test(
		getName({
			stackDescription:
				"first depends upon grandchild of permeable in child of second in parent",
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
			[ [ {
				id:
					"parent",
				items:
					[ [
						{ id: "first" },
						{
							id:
								"second",
							items:
								[ [ {
									dependencyPermeable: true,
									id: "childOfSecond",
									items: [ [ { id: "grandchildOfSecond" } ] ],
								} ] ],
						},
					] ],
			} ] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const parent = stack[0][0];

		const [ first, second ] = parent.items[0];

		const child = second.items[0][0];

		const grandchild = child.items[0][0];

		first.dependsUpon =
			[ {
				ancestors: [ second, parent ],
				item: grandchild,
				itemOrFirstAncestorItem: grandchild,
			} ];

		grandchild.dependents =
			[ { item: first } ];

		return stack;
	}
}