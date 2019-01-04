const createStackFromYaml = require("..");

module.exports =
	({
		stack,
		stackDescription,
		yaml,
	}) =>
		test(
			`${JSON.stringify(yaml)} returns ${stackDescription}`,
			() =>
				expect(createStackFromYaml(yaml))
				.toEqual(stack),
		);