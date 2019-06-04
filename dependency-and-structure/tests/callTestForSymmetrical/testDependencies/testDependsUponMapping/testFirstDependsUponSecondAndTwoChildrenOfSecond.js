const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test => {
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

		level[0].dependsUpon =
			[
				{ item: level[1] },
				{ item: children[0], parent: level[1] },
				{ item: children[1], parent: level[1] },
			];

		level[1].dependents = [ level[0] ];
		children[0].dependents = [ level[0] ];
		children[1].dependents = [ level[0] ];

		test({
			stack,
			stackDescription:
				"first depends upon second and two children of second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							[
								"item2",
								{
									id: "item2",
									items: [ "child1", "child2" ],
								},
							],
						id:
							"item1",
					}),
					createItemYaml({
						id: "item2",
						items: [ "child1", "child2" ],
					}),
				],
		});
	};