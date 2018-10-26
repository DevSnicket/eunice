const
	createItemYaml = require("../../createItemYaml"),
	createStack = require("../../createStack"),
	stackDescriptionFromCreateTestCase = require("../../stackDescriptionFromCreateTestCase");

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
							dependsUpon:
								[
									"item2",
									"item3",
								],
							id:
								"item1",
						}),
						"item2",
						"item3",
					],
			}
		);

		function addDependencies() {
			const level = stack[0];

			const dependentItems = [ level[1], level[2] ];

			level[0].dependsUpon = dependentItems;

			dependentItems[0].dependents =
				[ level[0] ];
			dependentItems[1].dependents =
				[ level[0] ];
		}
	};