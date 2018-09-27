const
	createCompareIndexedItemOrLevel = require("./createCompareIndexedItemOrLevel");

module.exports =
	({
		getItemIndex,
		items,
	}) =>
		items
		&&
		createOrderItemsByCompareIndexedItemOrLevel(
			createCompareIndexedItemOrLevel(getItemIndex),
		)(items);

function createOrderItemsByCompareIndexedItemOrLevel(
	compareIndexedItemOrLevel,
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
					compareIndexedItemOrLevel,
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