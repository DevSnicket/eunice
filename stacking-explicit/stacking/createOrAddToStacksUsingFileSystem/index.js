// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getTargetLevelOrStackForAncestorsAndDirectory = require("./getTargetLevelOrStackForAncestorsAndDirectory"),
	replaceIdentifiersAndItemsAndLevelsAndStacks = require("../../replacement/replaceIdentifiersAndItemsAndLevelsAndStacks");

module.exports =
	({
		addNewInTarget = true,
		directory,
		identifierOrItemOrLevelOrStack,
		stackFileName,
		subsetIdentifierHierarchy,
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