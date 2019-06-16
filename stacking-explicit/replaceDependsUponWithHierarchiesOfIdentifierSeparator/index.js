const
	getIdentifierOrReplaceItemOrItemsInLevelOrStack = require("./getIdentifierOrReplaceItemOrItemsInLevelOrStack"),
	replaceDependsUpon = require("./replaceDependsUpon");

module.exports =
	({
		identifierSeparator,
		items,
	}) =>
		items
		&&
		getIdentifierOrReplaceItemOrItemsInLevelOrStack({
			identifierOrItemOrLevelOrStack: items,
			replaceItem:
				({
					dependsUpon,
					...restOfItem
				}) => (
					{
						dependsUpon:
							replaceDependsUpon({
								dependsUpon,
								identifierSeparator,
							}),
						...restOfItem,
					}
				),
		});