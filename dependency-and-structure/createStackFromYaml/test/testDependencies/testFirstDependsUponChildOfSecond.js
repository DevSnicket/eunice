const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() =>
		testCreateStackFromYaml({
			stack:
				createStackAndAddDependencies(),
			stackDescription:
				"first depends upon child of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: { id: "child" },
							id: "first",
						}),
						createItemYaml({
							id: "second",
							items: { id: "child" },
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
						items: [ [ { id: "child" } ] ],
					},
				],
			],
		);

	const items = stack[0];

	const child = items[1].items[0][0];

	items[0].dependsUpon = mapItemsToDependsUpon([ child ]);
	child.dependents = [ items[0] ];

	return stack;
}