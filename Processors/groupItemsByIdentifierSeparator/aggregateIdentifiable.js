const
	aggregateWhenIdentifierElementsInCommon = require("./aggregateIdentifiable/aggregateWhenIdentifierElementsInCommon"),
	aggregateWhenInAncestorGroup = require("./aggregateIdentifiable/aggregateWhenInAncestorGroup"),
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
				aggregateWhenInAncestorGroup({
					aggregation,
					createGroupWithItemInGroup,
					identifierElementsStartsWith,
				})
				||
				aggregateInNewGroup()
			);
		}

		function aggregateWhenSubgroup() {
			return (
				aggregation.group.lastItemOfGroup
				&&
				identifierElementsStartsWith(
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
					aggregation.group.identifierElements
				)
				&&
				{
					group: createGroupWithItemInGroup(aggregation.group),
					items: aggregation.items,
				}
			);
		}

		function identifierElementsStartsWith(
			startsWithElements
		) {
			return (
				startsWithElements.every(
					(identifierElement, index) =>
						identifierElement === identifierElements[index]
				)
			);
		}

		function createGroupWithItemInGroup(
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