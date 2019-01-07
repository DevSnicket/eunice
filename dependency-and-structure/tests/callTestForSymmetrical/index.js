const
	createFirstAndSecondLevel = require("./createFirstAndSecondLevel"),
	createItemYaml = require("../createItemYaml"),
	createParentChildLevels = require("../createParentChildLevels"),
	createStackFromLevels = require("../createStackFromLevels"),
	createUpperAndLowerStack = require("../createUpperAndLowerStack"),
	formatStackForDescription = require("../formatStackForDescription"),
	mapItemsToDependsUpon = require("../mapItemsToDependsUpon"),
	testDependencies = require("./testDependencies");

module.exports =
	test => {
		describe(
			"symmetrical",
			() => {
				createTestCasesWithSimpleLevels()
				.forEach(testSideWithSimpleLevels);

				testDependencies(test);
			},
		);

		function testSideWithSimpleLevels({
			levels,
			yaml,
		}) {
			const stack = createStackFromLevels(levels);

			test({
				stack,
				stackDescription: formatStackForDescription(stack),
				yaml,
			});
		}
	};

function createTestCasesWithSimpleLevels() {
	return (
		[
			{
				levels:
					[ [ { id: "item" } ] ],
				yaml:
					"item",
			},
			{
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
			},
			{
				levels:
					[ createFirstAndSecondLevel() ],
				yaml:
					[ "first", "second" ],
			},
			{
				levels:
					createUpperAndLowerStack(),
				yaml:
					[ [ "upper" ], [ "lower" ] ],
			},
			{
				levels:
					[
						[
							{ items: [ [ { id: "item" } ] ] },
						],
					],
				yaml:
					{ items: "item" },
			},
			{
				levels:
					createParentChildLevels(),
				yaml:
					{
						id: "parent",
						items: "child",
					},
			},
			{
				levels:
					[
						[
							{
								dependsUpon: mapItemsToDependsUpon([ "missing" ]),
								id: "item1",
							},
						],
					],
				yaml:
					createItemYaml({
						dependsUpon: "missing",
						id: "item1",
					}),
			},
		]
	);
}