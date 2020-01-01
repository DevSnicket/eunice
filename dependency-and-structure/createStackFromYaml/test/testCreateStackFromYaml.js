/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const createStackFromYaml = require("..");

module.exports =
	({
		stack,
		yaml,
	}) =>
		test(
			JSON.stringify(yaml),
			() =>
				expect(createStackFromYaml(yaml))
				.toEqual(stack),
		);