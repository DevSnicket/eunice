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
				[ ...itemsOrLevels ]
				.sort(
					compareItemsOrLevels
				)
				.map(
					item =>
						createItemWithOrderedItemsWhenAny(item)
						||
						item
				)
			);
		}
	}

	function compareItemsOrLevels(
		leftItemOrLevel,
		rightItemOrLevel
	) {
		const
			leftIndex = getIndexOfItemOrLevel(leftItemOrLevel),
			rightIndex = getIndexOfItemOrLevel(rightItemOrLevel);

		return (
			leftIndex !== -1
			&&
			rightIndex !== -1
			&&
			leftIndex !== rightIndex
			&&
			(leftIndex < rightIndex ? -1 : 1)
		);
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