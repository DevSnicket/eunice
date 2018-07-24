const getItemOrCreateItemForGroup = require("../getItemOrCreateItemForGroup");

module.exports =
	({
		aggregation,
		createLastItemOfGroupProperty,
		identifierElements,
		identifierSeparator,
		parentIdentifier,
	}) => {
		return (
			aggregateWhenInCommonWithGroup()
			||
			(aggregation.group.lastItemOfGroup && aggregateWhenInCommonWithLastItemOfGroup())
		);

		function aggregateWhenInCommonWithGroup() {
			const commonElements =
				getIdentifierElementsInCommonWith(
					aggregation.group.identifierElements
				);

			return (
				commonElements.length
				&&
				isSubgroupOfGroup(aggregation.group)
				&&
				aggregateWhenCommonElementsNotOfParent()
			);

			function isSubgroupOfGroup(
				group
			) {
				return (
					commonElements.length < group.identifierElements.length
					&&
					(!group.parent || isSubgroupOfGroup(group.parent))
				);
			}

			function aggregateWhenCommonElementsNotOfParent() {
				const identifier = commonElements.join(identifierSeparator);

				return (
					identifier !== parentIdentifier
					&&
					{
						group:
							{
								identifierElements: commonElements,
								item: { id: identifier },
								itemsOfGroup: [ getItemOrCreateItemForGroup(aggregation.group) ],
								...createLastItemOfGroupProperty(),
							},
						items:
							aggregation.items,
					}
				);
			}
		}

		function aggregateWhenInCommonWithLastItemOfGroup() {
			const commonElements =
				getIdentifierElementsInCommonWith(
					aggregation.group.lastItemOfGroup.identifierElements
				);

			return (
				isSubGroup()
				&&
				{
					group:
						{
							identifierElements:
								commonElements,
							item:
								{ id: commonElements.join(identifierSeparator) },
							itemsOfGroup:
								[
									...aggregation.group.itemsOfGroup || [],
									aggregation.group.lastItemOfGroup.item,
								],
							...createLastItemOfGroupProperty(),
							parent: aggregation.group,
						},
					items:
						aggregation.items,
				}
			);

			function isSubGroup() {
				return commonElements.length > aggregation.group.identifierElements.length;
			}
		}

		function getIdentifierElementsInCommonWith(
			otherIdentifierElements
		) {
			let isCommon = true;

			return (
				otherIdentifierElements.filter(
					(otherIdentifierElement, index) =>
						isCommon =
							isCommon
							&&
							otherIdentifierElement === identifierElements[index]
				)
			);
		}
	};