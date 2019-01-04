const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getIdentifiersInNewStackWhenParentAncestor = require("./getIdentifiersInNewStackWhenParentAncestor"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

module.exports =
	({
		identifierPattern,
		identifiersInNewStack,
		items,
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
								parentIdentifierPattern: identifierPattern,
							}),
					}),
		});