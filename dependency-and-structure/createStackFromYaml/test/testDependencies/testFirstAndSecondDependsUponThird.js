const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		const stack =
			createStackFromLevels(
				[
					[
						{ id: "item1" },
						{ id: "item2" },
						{ id: "item3" },
					],
				],
			);

		addDependencies();

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"first and second depends upon third",
			yaml:
				[
					createItemYaml({
						dependsUpon: "item3",
						id: "item1",
					}),
					createItemYaml({
						dependsUpon: "item3",
						id: "item2",
					}),
					"item3",
				],
		});

		function addDependencies() {
			const level = stack[0];

			level[0].dependsUpon = [ level[2] ];
			level[1].dependsUpon = [ level[2] ];

			level[2].dependents = [ level[0], level[1] ];
		}
	};