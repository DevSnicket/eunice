const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

module.exports =
	() => {
		const stack = createStackFromLevels([ [ { id: "item" } ] ]);

		stack[0][0].dependsUpon = [ "missing" ];

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"depends upon missing",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: { id: "missing" },
							id: "item",
						}),
					],
				],
		});
	};