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