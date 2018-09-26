const
	createStackFromYaml = require("."),
	createTestcases = require("../createTestcases");

test.each(
	createTestcases()
	.map(testcase => [ testcase.yaml, testcase.stackFormatted, testcase.stack ]),
)(
	"%j returns %s",
	(yaml, stackFormatted, stack) =>
		expect(createStackFromYaml(yaml))
		.toEqual(stack),
);