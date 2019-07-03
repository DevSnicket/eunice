/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createCompareIndexedItemOrLevel = require("./createCompareIndexedItemOrLevel");

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