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
						id: "missingParent",
						items: [ "missingChild1", "missingChild2" ],
					},
				id:
					"item",
			});

	test(
		getName({
			stackDescription:
				"depends upon two missing children in missing parent",
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
				ancestors: [ "missingParent" ],
				item: "missingChild1",
			},
			{
				ancestors: [ "missingParent" ],
				item: "missingChild2",
			},
		];

	return stack;
}