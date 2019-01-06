const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

module.exports =
	() => {
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

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"depends upon missing",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon:
								{
									id: "missingParent",
									items: [ "missingChild1", "missingChild2" ],
								},
							id:
								"item",
						}),
					],
				],
		});
	};