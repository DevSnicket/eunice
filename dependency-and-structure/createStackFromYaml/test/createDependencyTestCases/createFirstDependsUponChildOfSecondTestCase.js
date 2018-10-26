const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createStack = require("../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() => (
		{
			stack:
				createStackAndAddDependencies(),
			stackDescription:
				stackDescriptionFromCreateTestCase.getFromModule(),
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
		}
	);

function createStackAndAddDependencies() {
	const stack =
		createStack(
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

	items[0].dependsUpon = [ child ];
	child.dependents = [ items[0] ];

	return stack;
}