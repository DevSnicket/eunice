const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test => {
		const stack = createStackFromLevels([ [ { id: "item" } ] ]);

		stack[0][0].dependsUpon =
			[
				{
					ancestors: [ "missingGrandchild", "missingChild", "missingParent" ],
					item: "missingGreatGrandchild",
				},
			];

		test({
			stack,
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
	};