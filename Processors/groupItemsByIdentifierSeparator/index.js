const
	aggregateIdentifiable = require("./aggregateIdentifiable"),
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	getItemsFromAggregation = require("./getItemsFromAggregation"),
	processorPlugins = require("../../Harnesses/processorPlugins");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	groupItemsByIdentifierSeparator,
);

processorPlugins.plugIn({
	action: groupItemsByIdentifierSeparator,
	parameter: { name: "identifierSeparator" },
	text: "group items by identifier separator",
});

module.exports = groupItemsByIdentifierSeparator;

function groupItemsByIdentifierSeparator({
	identifierSeparator,
	items,
}) {
	return createGroupItemsForIdentifierSeparator(identifierSeparator)(items);
}

function createGroupItemsForIdentifierSeparator(
	identifierSeparator,
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
						null,
					),
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
		throwErrorOnUnordered(
			aggregateIdentifiable({
				aggregation,
				identifierElements: identifier.split(identifierSeparator),
				itemWithItemsGrouped: createItemWithItemsGrouped(),
				joinIdentifierSeparatorElements,
				parentIdentifier,
			}),
		)
		:
		{
			group:
				{
					identifierElements: [],
					item,
				},
			items:
				getItemsFromAggregation(aggregation),
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

	function joinIdentifierSeparatorElements(
		identifierElements,
	) {
		return identifierElements.join(identifierSeparator);
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

	function throwErrorOnUnordered(
		newAggregation,
	) {
		if (aggregation && identifier < aggregation.previousIdentifier)
			throw Error(`Item identifiers must be in order, "${identifier}" can not follow "${aggregation.previousIdentifier}".`);
		else
			return (
				{
					...newAggregation,
					previousIdentifier: identifier,
				}
			);
	}
}