const
	yaml = require("js-yaml");

const
	aggregateIdentifiable = require("./groupItemsByIdentifierSeparator/aggregateIdentifiable"),
	callWhenProcessEntryPoint = require("../callWhenProcessEntryPoint"),
	getItemsFromAggregation = require("./groupItemsByIdentifierSeparator/getItemsFromAggregation");

callWhenProcessEntryPoint(
	processArguments =>
		yaml.safeDump(
			groupItemsByIdentifierSeparator({
				...processArguments,
				items: yaml.safeLoad(processArguments.items),
			}),
			{ lineWidth: Number.MAX_SAFE_INTEGER }
		),
	{ standardInputParameter: "items" }
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