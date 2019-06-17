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
		withIdentifierSeparator(identifierSeparator)
		.getIdentifierOrReplaceDependsUponInItemOrItemsInLevelOrStack(items);

function withIdentifierSeparator(
	identifierSeparator,
) {
	return { getIdentifierOrReplaceDependsUponInItemOrItemsInLevelOrStack };

	function getIdentifierOrReplaceDependsUponInItemOrItemsInLevelOrStack(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			getIdentifierOrReplaceItemOrItemsInLevelOrStack({
				identifierOrItemOrLevelOrStack,
				replaceItem: replaceInItem,
			})
		);
	}

	function replaceInItem({
		dependsUpon,
		items,
		...restOfItem
	}) {
		return (
			{
				...replaceDependsUponAsProperty(
					dependsUpon,
				),
				...replaceInItemsAsProperty(
					items,
				),
				...restOfItem,
			}
		);
	}

	function replaceDependsUponAsProperty(
		dependsUpon,
	) {
		return (
			dependsUpon
			&&
			{
				dependsUpon:
					replaceDependsUpon({
						dependsUpon,
						identifierSeparator,
					}),
			}
		);
	}

	function replaceInItemsAsProperty(
		items,
	) {
		return (
			items
			&&
			{
				items:
					getIdentifierOrReplaceDependsUponInItemOrItemsInLevelOrStack(
						items,
					),
			}
		);
	}
}