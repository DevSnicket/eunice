const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

module.exports =
	({
		identifiersInNewStack,
		items,
	}) =>
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				({ identifierOrItemOrLevelOrStack }) =>
					createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
						identifierOrItemOrLevelOrStack,
						identifiersInNewStack,
					}),
		});