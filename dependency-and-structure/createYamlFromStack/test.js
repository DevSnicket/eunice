const
	createSymmetricalTestCases = require("../testcases/createSymmetricalTestCases"),
	createYamlFromStack = require(".");

describe(
	"createYamlFromStack",
	() =>
		test.each(
			createSymmetricalTestCases()
			.map(testcase => [ testcase.stackDescription, testcase.yaml, testcase.stack ]),
		)(
			"%s returns %j",
			(stackDescription, yaml, stack) =>
				expect(createYamlFromStack(stack))
				.toEqual(yaml),
		),
);