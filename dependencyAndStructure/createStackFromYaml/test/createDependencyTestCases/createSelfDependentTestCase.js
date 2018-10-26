const
	createItemYaml = require("../../../testcases/createItemYaml"),
	createStack = require("../../../testcases/createStack"),
	stackDescriptionFromCreateTestCase = require("../../../testcases/stackDescriptionFromCreateTestCase");

module.exports =
	() => {
		const identifier = "item";

		const stack = createStack([ [ { id: identifier } ] ]);

		addDependencies();

		return (
			{
				stack,
				stackDescription:
					stackDescriptionFromCreateTestCase.getFromModule(),
				yaml:
					createItemYaml({
						dependsUpon: identifier,
						id: identifier,
					}),
			}
		);

		function addDependencies() {
			const item = stack[0][0];

			item.dependents = [ item ];
			item.dependsUpon = [ item ];
		}
	};