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

		const child = level[1].items[0][0];

		level[0].dependsUpon = [ { item: child, parent: level[1] } ];
		child.dependents = [ level[0] ];

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"first depends upon child of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon:
								{
									id: "item2",
									items: "child",
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