// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	hasParentInAncestors = require("./hasParentInAncestors"),
	replaceItemsAndInItems = require("../../replaceItemsAndInItems");

module.exports =
	({
		addNewInTarget = true,
		items,
		keysAndPatterns,
		targetLevelOrStack,
	}) =>
		replaceItemsAndInItems({
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