// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createParentChildLevels = require("../../../../stackAndYamlTesting/createParentChildLevels"),
	createStackFromLevels = require("../../../../stackAndYamlTesting/createStackFromLevels");

module.exports =
	() => {
		const stack = createStackFromLevels(createParentChildLevels());

		const parent = stack[0][0];

		return (
			{
				child: parent.items[0][0],
				parent,
				stack,
			}
		);
	};