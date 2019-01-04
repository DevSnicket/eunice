const
	createItemYaml = require("../createItemYaml"),
	createStackFromLevels = require("../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon second and third",
			yaml:
				createYaml(),
		});

function createStack() {
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

	return stack;

	function addDependencies() {
		const level = stack[0];

		const dependentItems = [ level[1], level[2] ];

		level[0].dependsUpon = dependentItems;

		dependentItems[0].dependents =
			[ level[0] ];
		dependentItems[1].dependents =
			[ level[0] ];
	}
}

function createYaml() {
	return (
		[
			createItemYaml({
				dependsUpon:
					[
						"item2",
						"item3",
					],
				id:
					"item1",
			}),
			"item2",
			"item3",
		]
	);
}