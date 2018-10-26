const
	createItemYaml = require("../../../../testcases/createItemYaml"),
	createStack = require("../../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() => {
		const stack =
			createStack(
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

		const child = level[1].items[0][0];

		level[0].dependsUpon = [ child ];
		child.dependents = [ level[0] ];

		return (
			{
				stack,
				stackDescription:
					stackDescriptionFromCreateTestCase.getFromModule(),
				yaml:
					[
						[
							createItemYaml({
								dependsUpon: { id: "item2", items: "child" },
								id: "item1",
							}),
							createItemYaml({
								id: "item2",
								items: "child",
							}),
						],
					],
			}
		);
	};