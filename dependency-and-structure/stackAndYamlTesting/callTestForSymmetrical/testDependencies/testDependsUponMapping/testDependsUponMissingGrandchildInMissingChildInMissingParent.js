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
			createItemYaml({
				dependsUpon:
					{
						id:
							"missingParent",
						items:
							{
								id: "missingChild",
								items: "missingGrandchild",
							},
					},
				id:
					"item",
			});

	test(
		getName({
			stackDescription:
				"depends upon missing grandchild in missing child in missing parent",
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
	const stack = createStackFromLevels([ [ { id: "item" } ] ]);

	stack[0][0].dependsUpon =
		[
			{
				ancestors: [ "missingChild", "missingParent" ],
				item: "missingGrandchild",
			},
		];

	return stack;
}