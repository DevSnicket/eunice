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
							items:
								[
									[
										{ id: "child1" },
										{ id: "child2" },
									],
								],
						},
					],
				],
			);

		const level = stack[0];

		const children = level[1].items[0];

		level[0].dependsUpon = [ children[0], children[1] ];
		children[0].dependents = [ level[0] ];
		children[1].dependents = [ level[0] ];

		return (
			{
				stack,
				stackDescription:
					stackDescriptionFromCreateTestCase.getFromModule(),
				yaml:
					[
						[
							createItemYaml({
								dependsUpon: { id: "item2", items: [ "child1", "child2" ] },
								id: "item1",
							}),
							createItemYaml({
								id: "item2",
								items: [ "child1", "child2" ],
							}),
						],
					],
			}
		);
	};