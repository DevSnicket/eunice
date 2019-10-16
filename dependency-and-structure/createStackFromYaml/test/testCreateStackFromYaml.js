/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const createStackFromYaml = require("..");

module.exports =
	({
		dependenciesInDescendantsOfItemPredicate = null,
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
				expect(
					createStackFromYaml({
						dependenciesInDescendantsOfItemPredicate,
						yaml,
					}),
				)
				.toEqual(stack),
		);

function formatTestName({
	stackDescription,
	yaml,
}) {
	return `${JSON.stringify(yaml)} returns "${stackDescription}"`;
}