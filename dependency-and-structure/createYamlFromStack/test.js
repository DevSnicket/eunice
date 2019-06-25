/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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
					`"${stackDescription}" returns ${JSON.stringify(yaml)}`,
					() =>
						expect(createYamlFromStack(stack))
						.toEqual(yaml),
				),
		),
);