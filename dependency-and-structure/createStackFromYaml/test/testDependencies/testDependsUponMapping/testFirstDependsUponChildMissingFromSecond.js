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
						{
							id: "item2",
							items: [ [ { id: "child" } ] ],
						},
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon = [ { item: "missing", parent: level[1] } ];

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"first depends upon child missing from second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon:
								{
									id: "item2",
									items: "missing",
								},
							id:
								"item1",
						}),
						createItemYaml({
							id: "item2",
							items: "child",
						}),
					],
				],
		});
	};