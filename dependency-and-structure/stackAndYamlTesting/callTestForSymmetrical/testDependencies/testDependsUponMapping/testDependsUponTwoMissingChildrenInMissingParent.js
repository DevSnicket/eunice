// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"depends upon two missing children in missing parent",
			yaml:
				createItemYaml({
					dependsUpon:
						{
							id: "missingParent",
							items: [ "missingChild1", "missingChild2" ],
						},
					id:
						"item",
				}),
		});

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