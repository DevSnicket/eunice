const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		testCreateStackFromYaml({
			stack:
				createStackWithDependencies(),
			stackDescription:
				"child of first depends upon second",
			yaml:
				[
					createItemYaml({
						id: "first",
						items:
							createItemYaml({
								dependsUpon: "second",
								id: "child",
							}),
					}),
					"second",
				],
		});

		function createStackWithDependencies() {
			const stack =
				createStackFromLevels(
					[
						[
							{
								id: "first",
								items: [ [ { id: "child" } ] ],
							},
							{ id: "second" },
						],
					],
				);

			const level = stack[0];

			const child = level[0].items[0][0];

			child.dependsUpon = [ level[1] ];
			level[1].dependents = [ child ];

			return stack;
		}
	};