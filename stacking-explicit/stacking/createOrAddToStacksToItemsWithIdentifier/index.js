const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getIdentifiersInNewStackWhenParentAncestor = require("./getIdentifiersInNewStackWhenParentAncestor"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

module.exports =
	({
		identifiersInNewStack,
		items,
		toIdentifier,
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
							getIdentifiersInNewStackWhenParentAncestor({
								ancestors,
								identifiersInNewStack,
								parentIdentifier: toIdentifier,
							}),
					}),
		});