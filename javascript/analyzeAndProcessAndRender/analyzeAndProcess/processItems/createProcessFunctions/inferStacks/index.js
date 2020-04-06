// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createStackFromYamlWithAncestors from "./createStackFromYamlWithAncestors";
import inferStackFromLevel from "./inferStackFromLevel";
import { replaceIdentifiersAndItemsAndLevelsAndStacks } from "@devsnicket/eunice-processors/replacement";
import replaceLevelOrLowestLevelOfStack from "./replaceLevelOrLowestLevelOfStack";

export default
identifierOrItemOrLevelOrStack =>
	replaceIdentifiersAndItemsAndLevelsAndStacks({
		identifierOrItemOrLevelOrStack,
		replace:
			replaceIdentifierOrItemOrLevelOrStack,
	});

function replaceIdentifierOrItemOrLevelOrStack({
	ancestors,
	identifierOrItemOrLevelOrStack,
}) {
	return whenLevelOrStack() || identifierOrItemOrLevelOrStack;

	function whenLevelOrStack() {
		return (
			Array.isArray(identifierOrItemOrLevelOrStack)
			&&
			replaceLevelOrLowestLevelOfStack({
				levelOrStack:
					identifierOrItemOrLevelOrStack,
				replaceLevelWithStack:
					level =>
						inferStackFromLevel({
							createStackFromYaml:
								yaml =>
									createStackFromYamlWithAncestors({
										ancestors,
										yaml,
									}),
							level,
						}),
			})
		);
	}
}