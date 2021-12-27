// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createStackFromYaml, createYamlFromStack } from "@devsnicket/eunice-dependency-and-structure";

import inferStacksInStack from "@devsnicket/eunice-stacking-inference";

export default
identifierOrItemOrLevelOrStack => {
	const stack =
		createStackFromYaml(
			identifierOrItemOrLevelOrStack,
		);

	inferStacksInStack(stack);

	return createYamlFromStack(stack);
};