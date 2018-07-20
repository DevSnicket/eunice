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
	return getItemOrGroupItems;

	function getItemOrGroupItems(
		itemOrItems
	) {
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
								getItemOrGroupItems,
								identifierSeparator,
								item,
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
	getItemOrGroupItems,
	identifierSeparator,
	item,
}) {
	const identifier = getIdentifierWhenSpecified();

	return (
		identifier
		?
		aggregateIdentifiable({
			aggregation,
			getItemOrGroupItems,
			identifierElements: identifier.split(identifierSeparator),
			item,
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
}