/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	callTestForSymmetrical = require("../../tests/callTestForSymmetrical"),
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