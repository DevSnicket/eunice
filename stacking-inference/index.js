// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import inferLevelsFromLevel from "./inferLevelsFromLevel";
import initializeParentReferencesInStack from "@devsnicket/eunice-dependency-and-structure/initializeParentReferencesInStack";
import replaceLowestLevelInStackAndDescendantStacks from "./replaceLowestLevelInStackAndDescendantStacks";

export default
stack => {
	const stackReplacement =
		replaceLowestLevelInStackAndDescendantStacks({
			replaceLowestLevelWithLevels:
				inferLevelsFromLevel,
			stack,
		});

	initializeParentReferencesInStack(
		stackReplacement,
	);

	return stackReplacement;
};