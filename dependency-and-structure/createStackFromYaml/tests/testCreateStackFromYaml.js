// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createStackFromYaml from "..";

export default ({
	stack,
	yaml,
}) =>
	test(
		JSON.stringify(yaml),
		() =>
			expect(createStackFromYaml(yaml))
			.toEqual(stack),
	);