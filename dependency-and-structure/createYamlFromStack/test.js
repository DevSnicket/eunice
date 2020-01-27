// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	callTestForSymmetrical = require("../stackAndYamlTesting/callTestForSymmetrical"),
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
					`"${stackDescription}" returns ${JSON.stringify(yaml)}`,
					() =>
						expect(createYamlFromStack(stack))
						.toEqual(yaml),
				),
		),
);