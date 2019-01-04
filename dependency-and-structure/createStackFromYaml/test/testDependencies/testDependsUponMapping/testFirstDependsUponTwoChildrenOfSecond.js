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
							items:
								[
									[
										{ id: "child1" },
										{ id: "child2" },
									],
								],
						},
					],
				],
			);

		const level = stack[0];

		const children = level[1].items[0];

		level[0].dependsUpon = [ children[0], children[1] ];
		children[0].dependents = [ level[0] ];
		children[1].dependents = [ level[0] ];

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"first depends upon two children of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: { id: "item2", items: [ "child1", "child2" ] },
							id: "item1",
						}),
						createItemYaml({
							id: "item2",
							items: [ "child1", "child2" ],
						}),
					],
				],
		});
	};