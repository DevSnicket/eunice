const
	getItemOrCreateItemForGroup = require("./getItemOrCreateItemForGroup"),
	getItemsFromAggregation = require("./getItemsFromAggregation");

module.exports =
	({
		aggregation,
		getItemOrGroupItems,
		identifierElements,
		item,
	}) => {
		return (
			aggregation
			?
			aggregateSubsequentItem()
			:
			{ group: createGroupWithItemAsNewGroup() }
		);

		function aggregateSubsequentItem() {
			return (
				aggregateWhenNewSubgroup()
				||
				aggregateWhenInCurrentGroup()
				||
				aggregateWhenInParentGroup()
				||
				aggregateWithNewGroup()
			);
		}

		function aggregateWhenNewSubgroup() {
			return (
				aggregation.group.lastItemOfGroup
				&&
				identifierElementsStartsWith(
					identifierElements,
					aggregation.group.lastItemOfGroup.identifierElements
				)
				&&
				{
					group:
						{
							identifierElements:
								aggregation.group.lastItemOfGroup.identifierElements,
							item:
								aggregation.group.lastItemOfGroup.item,
							lastItemOfGroup:
								{
									identifierElements,
									item: createItemWithItemsGrouped(),
								},
							...createLastItemOfGroupProperty(),
							parent:
								aggregation.group,
						},
					items:
						aggregation.items,
				}
			);
		}

		function aggregateWhenInCurrentGroup() {
			return (
				identifierElementsStartsWith(
					identifierElements,
					aggregation.group.identifierElements
				)
				&&
				{
					group: createGroupWithItemInCurrentGroup(aggregation.group),
					items: aggregation.items,
				}
			);
		}

		function createGroupWithItemInCurrentGroup(
			group
		) {
			return (
				{
					identifierElements:
						group.identifierElements,
					item:
						group.item,
					itemsOfGroup:
						group.lastItemOfGroup
						&&
						[
							...group.itemsOfGroup || [],
							group.lastItemOfGroup.item,
						],
					...createLastItemOfGroupProperty(),
					parent:
						group.parent,
				}
			);
		}

		function createLastItemOfGroupProperty() {
			return (
				{
					lastItemOfGroup:
						{
							identifierElements,
							item: createItemWithItemsGrouped(),
						},
				}
			);
		}

		function aggregateWhenInParentGroup() {
			return (
				aggregation.group.parent
				&&
				identifierElementsStartsWith(
					identifierElements,
					aggregation.group.parent.identifierElements
				)
				&&
				{
					group:
						createGroupWithItemInCurrentGroup({
							...aggregation.group.parent,
							lastItemOfGroup:
								{
									identiferElements: aggregation.group.identiferElements,
									item: getItemOrCreateItemForGroup(aggregation.group),
								},
						}),
					items:
						aggregation.items,
				}
			);
		}

		function aggregateWithNewGroup() {
			return (
				{
					group: createGroupWithItemAsNewGroup(),
					items: getItemsFromAggregation(aggregation),
				}
			);
		}

		function createGroupWithItemAsNewGroup() {
			return (
				{
					identifierElements,
					item: createItemWithItemsGrouped(),
				}
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
					...item.items && { items: getItemOrGroupItems(item.items) },
				}
			);
		}
	};

function identifierElementsStartsWith(
	identiferElements,
	startsWithElements
) {
	return (
		startsWithElements.every(
			(identifierElement, index) =>
				identifierElement === identiferElements[index]
		)
	);
}