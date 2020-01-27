// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	callTestForSymmetrical = require("../../stackAndYamlTesting/callTestForSymmetrical"),
	createStackFromYaml = require("..");

callTestForSymmetrical(
	({
		stack,
		stackDescription,
		yaml,
	}) =>
		test(
			`${JSON.stringify(yaml)} return "${stackDescription}"`,
			() =>
				expect(createStackFromYaml(yaml))
				.toEqual(stack),
		),
);