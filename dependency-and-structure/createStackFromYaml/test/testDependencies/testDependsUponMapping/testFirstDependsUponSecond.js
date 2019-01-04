const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

module.exports =
	() => {
		const stack =
			createStackFromLevels(
				[
					[
						{ id: "item1" },
						{ id: "item2" },
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon = [ level[1] ];
		level[1].dependents = [ level[0] ];

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"first depends upon second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: { id: "item2" },
							id: "item1",
						}),
						"item2",
					],
				],
		});
	};