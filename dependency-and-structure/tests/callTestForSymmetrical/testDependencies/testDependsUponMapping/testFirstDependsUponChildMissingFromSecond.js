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
							items: [ [ { id: "child" } ] ],
						},
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon = [ { item: "missing", parent: level[1] } ];

		test({
			stack,
			stackDescription:
				"first depends upon child missing from second",
			yaml:
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
		});
	};