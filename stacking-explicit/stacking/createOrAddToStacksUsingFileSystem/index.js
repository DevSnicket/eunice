const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getIdentifiersInNewStackForAncestorsAndDirectory = require("./getIdentifiersInNewStackForAncestorsAndDirectory"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

module.exports =
	({
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
				}) =>
					createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
						addMissing:
							true,
						identifierOrItemOrLevelOrStack,
						identifiersInNewStack:
							getIdentifiersInNewStackForAncestorsAndDirectory({
								ancestors,
								directory,
								subsetIdentifierHierarchy,
							}),
					}),
		});