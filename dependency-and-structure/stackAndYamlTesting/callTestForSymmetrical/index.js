// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createFirstAndSecondLevel = require("./createFirstAndSecondLevel"),
	createItemYaml = require("../createItemYaml"),
	createParentChildLevels = require("../createParentChildLevels"),
	createStackFromLevels = require("../createStackFromLevels"),
	createUpperAndLowerStack = require("../createUpperAndLowerStack"),
	formatStackForDescription = require("../formatStackForDescription"),
	testDependencies = require("./testDependencies");

module.exports =
	/** @type {import("./Parameter.d")} */
	stackAndYamlTest => {
		describe(
			"symmetrical",
			() => {
				createSimpleLevelsTestCases()
				.forEach(testSideWithSimpleLevels);

				testDependencies(stackAndYamlTest);
			},
		);

		function testSideWithSimpleLevels({
			levels,
			yaml,
		}) {
			const stack = createStackFromLevels(levels);

			test(
				stackAndYamlTest.getName({
					stackDescription: formatStackForDescription(stack),
					yaml,
				}),
				() =>
					expect(stackAndYamlTest.getActual({ stack, yaml }))
					.toEqual(stackAndYamlTest.getExpected({ stack, yaml })),
			);
		}
	};

function createSimpleLevelsTestCases() {
	return (
		[
			{
				levels: [ [ {} ] ],
				yaml: {},
			},
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
								dependsUpon: [ { item: "missing" } ],
								id: "item",
							},
						],
					],
				yaml:
					createItemYaml({
						dependsUpon: "missing",
						id: "item",
					}),
			},
			{
				levels:
					[
						[
							{
								dependsUpon:
									[
										{ item: "missing1" },
										{ item: "missing2" },
									],
								id:
									"item",
							},
						],
					],
				yaml:
					createItemYaml({
						dependsUpon: [ "missing1", "missing2" ],
						id: "item",
					}),
			},
		]
	);
}