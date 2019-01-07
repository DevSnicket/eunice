const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test => {
		const stack = createStackFromLevels([ [ { id: "item" } ] ]);

		stack[0][0].dependsUpon =
			[
				{
					item: "missingChild1",
					parent: "missingParent",
				},
				{
					item: "missingChild2",
					parent: "missingParent",
				},
			];

		test({
			stack,
			stackDescription:
				"depends upon two children missing from missing",
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
	};