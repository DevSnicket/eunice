// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createStackFromLevels = require("../../../../stackAndYamlTesting/createStackFromLevels"),
	createUpperAndLowerStack = require("../../../../stackAndYamlTesting/createUpperAndLowerStack");

module.exports =
	() => {
		const stack = createStackFromLevels(createUpperAndLowerStack());

		return (
			{
				lower: stack[1][0],
				stack,
				upper: stack[0][0],
			}
		);
	};