const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createStack = require("../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() => {
		const stack =
			createStack(
				[
					[
						{ id: "item1" },
						{ id: "item2" },
						{ id: "item3" },
					],
				],
			);

		addDependencies();

		return (
			{
				stack,
				stackDescription:
					stackDescriptionFromCreateTestCase.getFromModule(),
				yaml:
					[
						createItemYaml({
							dependsUpon: "item3",
							id: "item1",
						}),
						createItemYaml({
							dependsUpon: "item3",
							id: "item2",
						}),
						"item3",
					],
			}
		);

		function addDependencies() {
			const level = stack[0];

			level[0].dependsUpon = [ level[2] ];
			level[1].dependsUpon = [ level[2] ];

			level[2].dependents = [ level[0], level[1] ];
		}
	};