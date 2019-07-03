/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	group =>
		getItemOrCreateGroupItem({
			groupItem:
				group.item,
			itemsOfGroup:
				group.lastItemOfGroup
				&&
				[
					...group.itemsOfGroup || [],
					group.lastItemOfGroup.item,
				],
		});

function getItemOrCreateGroupItem({
	groupItem,
	itemsOfGroup,
}) {
	return (
		itemsOfGroup
		?
		createGroupItemWithItemsOfGroup()
		:
		groupItem
	);

	function createGroupItemWithItemsOfGroup() {
		return (
			typeof groupItem === "string"
			?
			{
				id: groupItem,
				items: getItemOrItemsOfGroup(),
			}
			:
			{
				...groupItem,
				items:
					groupItem.items
					?
					getItemsOfGroupAndGroupItemItems()
					:
					getItemOrItemsOfGroup(),
			}
		);
	}

	function getItemsOfGroupAndGroupItemItems() {
		return (
			whenLevelOrStack()
			||
			[ groupItem.items, ...itemsOfGroup ]
		);

		function whenLevelOrStack() {
			return (
				Array.isArray(groupItem.items)
				&&
				(whenStack() || [ ...groupItem.items, ...itemsOfGroup ])
			);

			function whenStack() {
				return (
					groupItem.items.length && Array.isArray(groupItem.items[0])
					&&
					[ ...groupItem.items, itemsOfGroup ]
				);
			}
		}
	}

	function getItemOrItemsOfGroup() {
		return (
			itemsOfGroup.length === 1
			?
			itemsOfGroup[0]
			:
			itemsOfGroup
		);
	}
}