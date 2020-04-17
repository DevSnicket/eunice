// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import createStackWhenIdentifierOrItemOrLevelOrAddWhenStack from "../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack";
import getTargetLevelOrStackForAncestorsAndDirectory from "./getTargetLevelOrStackForAncestorsAndDirectory";
import replaceIdentifiersAndItemsAndLevelsAndStacks from "../../replacement/replaceIdentifiersAndItemsAndLevelsAndStacks";

export default ({
	addNewInTarget = true,
	directory,
	identifierOrItemOrLevelOrStack,
	stackFileName = ".eunice-stack.yaml",
	subsetIdentifierHierarchy = null,
}) =>
	replaceIdentifiersAndItemsAndLevelsAndStacks({
		identifierOrItemOrLevelOrStack,
		replace:
			withContext({
				addNewInTarget,
				directory,
				stackFileName,
				subsetIdentifierHierarchy,
			})
			.replace,
	});

function withContext({
	addNewInTarget,
	directory,
	stackFileName,
	subsetIdentifierHierarchy,
}) {
	return { replace };

	function replace({
		ancestors,
		identifierOrItemOrLevelOrStack,
	}) {
		const targetLevelOrStack =
			getTargetLevelOrStackForAncestorsAndDirectory({
				ancestors,
				directory,
				stackFileName,
				subsetIdentifierHierarchy,
			});

		return (
			targetLevelOrStack
			?
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				addNewInTarget,
				identifierOrItemOrLevelOrStack,
				targetLevelOrStack,
			})
			:
			identifierOrItemOrLevelOrStack
		);
	}
}