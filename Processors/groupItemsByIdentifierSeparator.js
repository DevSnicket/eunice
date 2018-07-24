const
	aggregateIdentifiable = require("./groupItemsByIdentifierSeparator/aggregateIdentifiable"),
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("./callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	getItemsFromAggregation = require("./groupItemsByIdentifierSeparator/getItemsFromAggregation");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	groupItemsByIdentifierSeparator
);

module.exports = groupItemsByIdentifierSeparator;

function groupItemsByIdentifierSeparator({
	identifierSeparator,
	items,
}) {
	return createGroupItemsForIdentifierSeparator(identifierSeparator)(items);
}

function createGroupItemsForIdentifierSeparator(
	identifierSeparator
) {
	return itemOrItems => getItemOrGroupItemsInParentIdentifier({ itemOrItems, parentIdentifier: null });

	function getItemOrGroupItemsInParentIdentifier({
		itemOrItems,
		parentIdentifier,
	}) {
		return (
			Array.isArray(itemOrItems)
			?
			groupItems()
			:
			itemOrItems
		);

		function groupItems() {
			return (
				getItemsFromAggregation(
					itemOrItems
					.reduce(
						(aggregation, item) =>
							aggregate({
								aggregation,
								getItemOrGroupItemsInParentIdentifier,
								identifierSeparator,
								item,
								parentIdentifier,
							}),
						null
					)
				)
			);
		}
	}
}

function aggregate({
	aggregation,
	getItemOrGroupItemsInParentIdentifier,
	identifierSeparator,
	item,
	parentIdentifier,
}) {
	const identifier = getIdentifierWhenSpecified();

	return (
		identifier
		?
		aggregateIdentifiable({
			aggregation,
			identifierElements: identifier.split(identifierSeparator),
			identifierSeparator,
			itemWithItemsGrouped: createItemWithItemsGrouped(),
			parentIdentifier,
		})
		:
		{
			group: { item },
			items: getItemsFromAggregation(aggregation),
		}
	);

	function getIdentifierWhenSpecified() {
		return (
			typeof item === "string"
			?
			item
			:
			item.id
		);
	}

	function createItemWithItemsGrouped() {
		return (
			typeof item === "string" || typeof item.items === "string"
			?
			item
			:
			{
				...item,
				...createItemsPropertyWhenAny(),
			}
		);

		function createItemsPropertyWhenAny() {
			return (
				item.items
				&&
				{
					items:
						getItemOrGroupItemsInParentIdentifier({
							itemOrItems: item.items,
							parentIdentifier: item.id,
						}),
				});
		}
	}
}