const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("./callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	createCompareIndexedItemOrLevelForTypesInOrder = require("./orderItemsByType/createCompareIndexedItemOrLevelForTypesInOrder"),
	processorPlugins = require("../Harnesses/processorPlugins");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlItemsAndOutputWhenProcessEntryPoint(
	processArguments =>
		orderItemsByType({
			...processArguments,
			typesInOrder:
				processArguments.typesInOrder
				.map(
					type =>
						type === ""
						?
						// type array index of will only work when exact match
						// eslint-disable-next-line no-undefined
						undefined
						:
						type,
				),
		}),
);

processorPlugins.plugIn({
	action: orderItemsByType,
	parameter: "typesInOrder",
	text: "order items by type",
});

module.exports = orderItemsByType;

function orderItemsByType({
	items,
	typesInOrder,
}) {
	return (
		items
		&&
		createOrderItemsByType(typesInOrder)(items)
	);
}

function createOrderItemsByType(
	typesInOrder,
) {
	return getItemOrOrderItems;

	function getItemOrOrderItems(
		itemOrItems,
	) {
		return (
			orderWhenItemsOrLevels(itemOrItems)
			||
			createItemWithOrderedItemsWhenAny(itemOrItems)
			||
			itemOrItems
		);
	}

	function orderWhenItemsOrLevels(
		itemsOrLevels,
	) {
		return (
			Array.isArray(itemsOrLevels)
			&&
			orderItemsOrLevels()
		);

		function orderItemsOrLevels() {
			return (
				itemsOrLevels
				.map(
					(itemOrLevel, index) => ({ index, itemOrLevel }),
				)
				.sort(
					createCompareIndexedItemOrLevelForTypesInOrder(typesInOrder),
				)
				.map(
					indexedItemOrLevel =>
						getOrCreateItemOrLevel(
							indexedItemOrLevel.itemOrLevel,
						),
				)
			);
		}
	}

	function getOrCreateItemOrLevel(
		itemOrLevel,
	) {
		return (
			Array.isArray(itemOrLevel)
			?
			createLevelWithOrderedItems(itemOrLevel)
			:
			getItemOrCreateItemWithOrderedItemsWhenAny(itemOrLevel)
		);
	}

	function createLevelWithOrderedItems(
		level,
	) {
		return level.map(getItemOrCreateItemWithOrderedItemsWhenAny);
	}

	function getItemOrCreateItemWithOrderedItemsWhenAny(
		item,
	) {
		return (
			createItemWithOrderedItemsWhenAny(item)
			||
			item
		);
	}

	function createItemWithOrderedItemsWhenAny(
		item,
	) {
		return (
			item.items
			&&
			{
				...item,
				items: getItemOrOrderItems(item.items),
			}
		);
	}
}