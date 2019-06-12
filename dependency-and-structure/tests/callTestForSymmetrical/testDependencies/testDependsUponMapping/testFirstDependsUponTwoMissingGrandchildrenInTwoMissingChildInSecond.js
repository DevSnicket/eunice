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
						{ id: "item2" },
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon =
			[
				{
					ancestors: [ "missingChild1", level[1] ],
					item: "missingGrandchild1",
				},
				{
					ancestors: [ "missingChild2", level[1] ],
					item: "missingGrandchild2",
				},
			];

		test({
			stack,
			stackDescription:
				"first depends upon two missing grandchildren in two missing children in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"item2",
								items:
									[
										{
											id: "missingChild1",
											items: "missingGrandchild1",
										},
										{
											id: "missingChild2",
											items: "missingGrandchild2",
										},
									],
							},
						id:
							"item1",
					}),
					"item2",
				],
		});
	};