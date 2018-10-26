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
						{ id: "item2" },
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon = [ level[1] ];
		level[1].dependents = [ level[0] ];

		return (
			{
				stack,
				stackDescription:
					stackDescriptionFromCreateTestCase.getFromModule(),
				yaml:
					[
						[
							createItemYaml({
								dependsUpon: { id: "item2" },
								id: "item1",
							}),
							"item2",
						],
					],
			}
		);
	};