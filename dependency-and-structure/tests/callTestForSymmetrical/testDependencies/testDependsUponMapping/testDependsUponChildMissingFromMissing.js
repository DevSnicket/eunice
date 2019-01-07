const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels");

module.exports =
	test => {
		const stack = createStackFromLevels([ [ { id: "item" } ] ]);

		stack[0][0].dependsUpon =
			[
				{
					item: "missingChild",
					parent: "missingParent",
				},
			];

		test({
			stack,
			stackDescription:
				"depends upon missing",
			yaml:
				createItemYaml({
					dependsUpon:
						{
							id: "missingParent",
							items: "missingChild",
						},
					id:
						"item",
				}),
		});
	};