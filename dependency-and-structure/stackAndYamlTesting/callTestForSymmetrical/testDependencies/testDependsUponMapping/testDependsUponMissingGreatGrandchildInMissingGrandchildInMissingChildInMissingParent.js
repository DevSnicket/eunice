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
				"depends upon missing great grandchild in missing grandchild in missing child in missing parent",
			yaml:
				createItemYaml({
					dependsUpon:
						{
							id:
								"missingParent",
							items:
								{
									id:
										"missingChild",
									items:
										{
											id: "missingGrandchild",
											items: "missingGreatGrandchild",
										},
								},
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
				ancestors: [ "missingGrandchild", "missingChild", "missingParent" ],
				item: "missingGreatGrandchild",
			},
		];

	return stack;
}