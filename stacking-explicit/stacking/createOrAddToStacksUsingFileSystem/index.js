// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getTargetLevelOrStackForAncestorsAndDirectory = require("./getTargetLevelOrStackForAncestorsAndDirectory"),
	replaceItemsAndInItems = require("../../replaceItemsAndInItems");

module.exports =
	({
		addNewInTarget = true,
		directory,
		items,
		subsetIdentifierHierarchy,
	}) =>
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				({
					ancestors,
					identifierOrItemOrLevelOrStack,
				}) => {
					const targetLevelOrStack =
						getTargetLevelOrStackForAncestorsAndDirectory({
							ancestors,
							directory,
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
				},
		});