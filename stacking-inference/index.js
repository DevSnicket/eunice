// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createStackFromYaml, createYamlFromStack } from "@devsnicket/eunice-dependency-and-structure";
import inferLevelsFromLevel from "./inferLevelsFromLevel";
import replaceLowestLevelInStackAndDescendantStacks from "./replaceLowestLevelInStackAndDescendantStacks";

export default
identifierOrItemOrLevelOrStack =>
	createYamlFromStack(
		replaceLowestLevelInStackAndDescendantStacks({
			replaceLowestLevelWithLevels:
				inferLevelsFromLevel,
			stack:
				createStackFromYaml(
					identifierOrItemOrLevelOrStack,
				),
		}),
	);