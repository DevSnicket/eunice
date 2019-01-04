const
	callTestForSymmetrical = require("../tests/callTestForSymmetrical"),
	createYamlFromStack = require(".");

describe(
	"createYamlFromStack",
	() =>
		callTestForSymmetrical(
			({
				stack,
				stackDescription,
				yaml,
			}) =>
				test(
					`${stackDescription} returns ${JSON.stringify(yaml)}`,
					() =>
						expect(createYamlFromStack(stack))
						.toEqual(yaml),
				),
		),
);