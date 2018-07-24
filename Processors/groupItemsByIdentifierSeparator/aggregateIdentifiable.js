const
	aggregateWhenIdentifierElementsInCommon = require("./aggregateIdentifiable/aggregateWhenIdentifierElementsInCommon"),
	getItemOrCreateItemForGroup = require("./getItemOrCreateItemForGroup"),
	getItemsFromAggregation = require("./getItemsFromAggregation");

module.exports =
	({
		aggregation,
		identifierElements,
		identifierSeparator,
		itemWithItemsGrouped,
		parentIdentifier,
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
				aggregateWhenSubgroup()
				||
				aggregateWhenIdentifierElementsInCommon({
					aggregation,
					createLastItemOfGroupProperty,
					identifierElements,
					identifierSeparator,
					parentIdentifier,
				})
				||
				aggregateWhenInCurrentGroup()
				||
				aggregateWhenInParentGroup()
				||
				aggregateInNewGroup()
			);
		}

		function aggregateWhenSubgroup() {
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
									item: itemWithItemsGrouped,
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
									identifierElements: aggregation.group.identifierElements,
									item: getItemOrCreateItemForGroup(aggregation.group),
								},
						}),
					items:
						aggregation.items,
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
							item: itemWithItemsGrouped,
						},
				}
			);
		}

		function aggregateInNewGroup() {
			return (
				{
					group:
						createGroupWithItemAsNewGroup(),
					items:
						getItemsFromAggregation(aggregation),
				}
			);
		}

		function createGroupWithItemAsNewGroup() {
			return (
				{
					identifierElements,
					item: itemWithItemsGrouped,
				}
			);
		}
	};

function identifierElementsStartsWith(
	identifierElements,
	startsWithElements
) {
	return (
		startsWithElements.every(
			(identifierElement, index) =>
				identifierElement === identifierElements[index]
		)
	);
}