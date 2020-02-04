// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	hasParentInAncestors = require("./hasParentInAncestors"),
	replaceIdentifiersAndItemsAndLevelsAndStacks = require("../../replacement/replaceIdentifiersAndItemsAndLevelsAndStacks");

module.exports =
	({
		addNewInTarget = true,
		identifierOrItemOrLevelOrStack,
		keysAndPatterns,
		targetLevelOrStack,
	}) =>
		replaceIdentifiersAndItemsAndLevelsAndStacks({
			identifierOrItemOrLevelOrStack,
			replace:
				withContext({
					addNewInTarget,
					keysAndPatterns,
					targetLevelOrStack,
				})
				.replace,
		});

function withContext({
	addNewInTarget,
	keysAndPatterns,
	targetLevelOrStack,
}) {
	return { replace };

	function replace({
		ancestors,
		identifierOrItemOrLevelOrStack,
	}) {
		return (
			hasParentInAncestors({
				ancestors,
				keysAndPatterns,
			})
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