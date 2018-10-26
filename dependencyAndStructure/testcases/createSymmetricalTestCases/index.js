const
	createDependencyTestCases = require("./createDependencyTestCases"),
	createFirstAndSecondLevel = require("./createFirstAndSecondLevel"),
	createItemYaml = require("../createItemYaml"),
	createParentChildLevels = require("../createParentChildLevels"),
	createTestCase = require("../createTestCase"),
	createUpperAndLowerStack = require("../createUpperAndLowerStack");

module.exports =
	() =>
		[
			createTestCase({
				levels:
					[ [ { id: "item" } ] ],
				yaml:
					"item",
			}),
			createTestCase({
				levels:
					[
						[
							{
								id: "item",
								otherProperty: "otherValue",
							},
						],
					],
				yaml:
					{
						id: "item",
						otherProperty: "otherValue",
					},
			}),
			createTestCase({
				levels:
					[ createFirstAndSecondLevel() ],
				yaml:
					[ "first", "second" ],
			}),
			createTestCase({
				levels:
					createUpperAndLowerStack(),
				yaml:
					[ [ "upper" ], [ "lower" ] ],
			}),
			createTestCase({
				levels:
					[
						[
							{ items: [ [ { id: "item" } ] ] },
						],
					],
				yaml:
					{ items: "item" },
			}),
			createTestCase({
				levels:
					createParentChildLevels(),
				yaml:
					{
						id: "parent",
						items: "child",
					},
			}),
			createTestCase({
				levels:
					[
						[
							{
								dependsUpon: [ "missing" ],
								id: "item1",
							},
						],
					],
				yaml:
					createItemYaml({
						dependsUpon: "missing",
						id: "item1",
					}),
			}),
			...createDependencyTestCases(),
		];