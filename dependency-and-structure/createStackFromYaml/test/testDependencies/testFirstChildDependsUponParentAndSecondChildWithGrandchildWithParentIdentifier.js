const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

const parentIdentifier = "parent";

module.exports =
	() =>
		testCreateStackFromYaml({
			stack:
				createStackWithDependencies(),
			stackDescription:
				"first child depends upon parent and second child with grandchild with parent identifier",
			yaml:
				createYaml(),
		});

function createStackWithDependencies() {
	const stack =
		createStackFromLevels(
			[
				[
					{
						id: parentIdentifier,
						items:
							[
								[
									{ id: "child1" },
									{
										id: "child2",
										items: [ [ { id: parentIdentifier } ] ],
									},
								],
							],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const parent = stack[0][0];

		const firstChild = parent.items[0][0];

		firstChild.dependsUpon = mapItemsToDependsUpon([ parent ]);
		parent.dependents = [ firstChild ];
	}
}

function createYaml() {
	return (
		{
			id:
				parentIdentifier,
			items:
				[
					createItemYaml({
						dependsUpon: parentIdentifier,
						id: "child1",
					}),
					createItemYaml({
						id: "child2",
						items: parentIdentifier,
					}),
				],
		}
	);
}