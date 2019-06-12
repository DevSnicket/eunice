const createStackFromYaml = require("..");

module.exports =
	({
		stack,
		stackDescription,
		yaml,
	}) =>
		test(
			formatTestName({
				stackDescription,
				yaml,
			}),
			() =>
				expect(createStackFromYaml(yaml))
				.toEqual(stack),
		);

function formatTestName({
	stackDescription,
	yaml,
}) {
	return `${JSON.stringify(yaml)} returns "${stackDescription}"`;
}