// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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