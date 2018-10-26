const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createStack = require("../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

const parentIdentifier = "parent";

module.exports =
	() => (
		{
			stack:
				createStackWithDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromModule(),
			yaml: createYaml(),
		}
	);

function createStackWithDependencies() {
	const stack =
		createStack(
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

		firstChild.dependsUpon = [ parent ];
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