const callWithYamlItemsAndOutputWhenProcessEntryPoint = require("./callWithYamlItemsAndOutputWhenProcessEntryPoint");

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
						type
				),
		})
);

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
	typesInOrder
) {
	return getItemOrOrderItems;

	function getItemOrOrderItems(
		itemOrItems
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
		itemsOrLevels
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
					(itemOrLevel, index) => ({ index, itemOrLevel })
				)
				.sort(
					compareIndexedItemsOrLevels
				)
				.map(
					indexedItemOrLevel =>
						getOrCreateItemOrLevel(
							indexedItemOrLevel.itemOrLevel
						)
				)
			);
		}
	}

	function compareIndexedItemsOrLevels(
		leftIndexedItemOrLevel,
		rightIndexedItemOrLevel
	) {
		const
			leftIndex = getIndexOfItemOrLevel(leftIndexedItemOrLevel.itemOrLevel),
			rightIndex = getIndexOfItemOrLevel(rightIndexedItemOrLevel.itemOrLevel);

		return (
			compareIndex()
			||
			compare(leftIndexedItemOrLevel.index, rightIndexedItemOrLevel.index)
		);

		function compareIndex() {
			return (
				leftIndex !== -1
				&&
				rightIndex !== -1
				&&
				compare(leftIndex, rightIndex)
			);
		}
	}

	function getIndexOfItemOrLevel(
		itemOrLevel
	) {
		return (
			Array.isArray(itemOrLevel)
			?
			getIndexOfLevel(itemOrLevel)
			:
			getIndexOfItem(itemOrLevel)
		);
	}

	function getIndexOfLevel(
		level
	) {
		return (
			level.length === 1
			?
			getIndexOfItem(level[0])
			:
			-1
		);
	}

	function getIndexOfItem(
		item
	) {
		return typesInOrder.indexOf(item.type);
	}

	function getOrCreateItemOrLevel(
		itemOrLevel
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
		level
	) {
		return level.map(getItemOrCreateItemWithOrderedItemsWhenAny);
	}

	function getItemOrCreateItemWithOrderedItemsWhenAny(
		item
	) {
		return (
			createItemWithOrderedItemsWhenAny(item)
			||
			item
		);
	}

	function createItemWithOrderedItemsWhenAny(
		item
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

function compare(
	left,
	right
) {
	return (
		left !== right
		&&
		(left < right ? -1 : 1)
	);
}