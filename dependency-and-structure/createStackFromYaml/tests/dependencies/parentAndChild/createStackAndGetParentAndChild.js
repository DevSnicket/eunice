// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createParentChildLevels from "../../../../stackAndYamlTesting/createParentChildLevels";
import createStackFromLevels from "../../../../stackAndYamlTesting/createStackFromLevels";

export default () => {
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