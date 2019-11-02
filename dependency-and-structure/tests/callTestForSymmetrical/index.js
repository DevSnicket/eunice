/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createFirstAndSecondLevel = require("./createFirstAndSecondLevel"),
	createItemYaml = require("../createItemYaml"),
	createParentChildLevels = require("../createParentChildLevels"),
	createStackFromLevels = require("../createStackFromLevels"),
	createUpperAndLowerStack = require("../createUpperAndLowerStack"),
	formatStackForDescription = require("../formatStackForDescription"),
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
									"item1",
							},
						],
					],
				yaml:
					createItemYaml({
						dependsUpon: [ "missing1", "missing2" ],
						id: "item1",
					}),
			},
		]
	);
}