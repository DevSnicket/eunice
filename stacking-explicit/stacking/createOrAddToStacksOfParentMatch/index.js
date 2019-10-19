// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	hasParentInAncestors = require("./hasParentInAncestors"),
	replaceIdentifiersAndItemsAndLevelsAndStacks = require("../../replacement/replaceIdentifiersAndItemsAndLevelsAndStacks");

module.exports =
	({
		addNewInTarget = true,
		items,
		keysAndPatterns,
		targetLevelOrStack,
	}) =>
		replaceIdentifiersAndItemsAndLevelsAndStacks({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				({
					ancestors,
					identifierOrItemOrLevelOrStack,
				}) =>
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
					identifierOrItemOrLevelOrStack,
		});