const
	createTestcases = require("./createTestcases"),
	createYamlFromStack = require("./createYamlFromStack");

test.each(
	createTestcases()
	.map(testcase => [ testcase.stackFormatted, testcase.yaml, testcase.stack ])
)(
	"%s returns %j",
	(stackFormatted, yaml, stack) =>
		expect(createYamlFromStack(stack))
		.toEqual(yaml)
);