const
	createItemYaml = require("../../../../testcases/createItemYaml"),
	createStack = require("../../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() => {
		const stack = createStack([ [ { id: "item" } ] ]);

		stack[0][0].dependsUpon = [ "missing" ];

		return (
			{
				stack,
				stackDescription:
					stackDescriptionFromCreateTestCase.getFromModule(),
				yaml:
					[
						[
							createItemYaml({
								dependsUpon: { id: "missing" },
								id: "item",
							}),
						],
					],
			}
		);
	};