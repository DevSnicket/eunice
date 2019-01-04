const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() =>
		testCreateStackFromYaml({
			stack:
				createStackAndAddDependencies(),
			stackDescription:
				"first depends upon grandchild of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: { id: "grandchild" },
							id: "first",
						}),
						createItemYaml({
							id:
								"second",
							items:
								createItemYaml({
									id: "child",
									items: "grandchild",
								}),
						}),
					],
				],
		});

function createStackAndAddDependencies() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{
						id: "second",
						items:
							[
								[
									{
										id: "child",
										items: [ [ { id: "grandchild" } ] ],
									},
								],
							],
					},
				],
			],
		);

	const items = stack[0];

	const grandchild = items[1].items[0][0].items[0][0];

	items[0].dependsUpon = [ grandchild ];
	grandchild.dependents = [ items[0] ];

	return stack;
}