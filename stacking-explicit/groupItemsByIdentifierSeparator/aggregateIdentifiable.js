const getItemsFromAggregation = require("./getItemsFromAggregation");

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
			aggregateWhenNewSubgroupOrInCurrentGroup() || aggregateNotInCurrentGroup()
			:
			createGroupPropertyFromItem()
		);

		function aggregateWhenNewSubgroupOrInCurrentGroup() {
			return (
				(isNewSubgroup() && aggregateNewSubgroup())
				||
				(isInCurrentGroup() && aggregateInCurrentGroup())
			);
		}

		function isNewSubgroup() {
			return (
				aggregation.group.lastItemOfGroup
				&&
				identifierElementsStartsWith(
					identifierElements,
					aggregation.group.lastItemOfGroup.identifierElements
				)
			);
		}

		function aggregateNewSubgroup() {
			return (
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

		function isInCurrentGroup() {
			return (
				identifierElementsStartsWith(
					identifierElements,
					aggregation.group.identifierElements
				)
			);
		}

		function aggregateInCurrentGroup() {
			return (
				{
					group:
						{
							identifierElements:
								aggregation.group.identifierElements,
							item:
								aggregation.group.item,
							itemsOfGroup:
								aggregation.group.lastItemOfGroup
								&&
								[
									...aggregation.group.itemsOfGroup || [],
									aggregation.group.lastItemOfGroup.item,
								],
							...createLastItemOfGroupProperty(),
						},
					items:
						aggregation.items,
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

		function aggregateNotInCurrentGroup() {
			return (
				{
					...createGroupPropertyFromItem(),
					items: getItemsFromAggregation(aggregation),
				}
			);
		}

		function createGroupPropertyFromItem() {
			return (
				{
					group:
						{
							identifierElements,
							item: createItemWithItemsGrouped(),
						},
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