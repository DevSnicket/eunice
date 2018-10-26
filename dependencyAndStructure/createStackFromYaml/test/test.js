const
	createDependencyTestCases = require("./createDependencyTestCases"),
	createStackFromYaml = require(".."),
	createSymmetricalTestCases = require("../../testcases/createSymmetricalTestCases"),
	createTestCase = require("../../testcases/createTestCase");

test.each(
	[
		...createSymmetricalTestCases(),
		createTestCase({
			levels:
				[
					[ { id: "item1" } ],
					[ { id: "item2" } ],
				],
			yaml:
				[ [ "item1" ], "item2" ],
		}),
		...createDependencyTestCases(),
	]
	.map(testcase => [ testcase.yaml, testcase.stackDescription, testcase.stack ]),
)(
	"%j returns %s",
	(yaml, stackDescription, stack) =>
		expect(createStackFromYaml(yaml))
		.toEqual(stack),
);