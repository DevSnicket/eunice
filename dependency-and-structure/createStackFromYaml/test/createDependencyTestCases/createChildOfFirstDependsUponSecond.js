const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createStack = require("../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() => {
		return (
			{
				stack:
					createStackWithDependencies(),
				stackDescription:
					stackDescriptionFromCreateTestCase.getFromModule(),
				yaml:
					[
						createItemYaml({
							id: "first",
							items:
								createItemYaml({
									dependsUpon: "second",
									id: "child",
								}),
						}),
						"second",
					],
			}
		);

		function createStackWithDependencies() {
			const stack =
				createStack(
					[
						[
							{
								id: "first",
								items: [ [ { id: "child" } ] ],
							},
							{ id: "second" },
						],
					],
				);

			const level = stack[0];

			const child = level[0].items[0][0];

			child.dependsUpon = [ level[1] ];
			level[1].dependents = [ child ];

			return stack;
		}
	};