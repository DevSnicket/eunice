const getItemOrCreateItemForGroupAndParents = require("../getItemOrCreateItemForGroupAndParents");

module.exports =
	({
		aggregation,
		createLastItemOfGroupProperty,
		getIdentifierElementsInCommonWith,
		joinIdentifierSeparatorElements,
		parentIdentifier,
	}) => {
		const commonElements =
			getIdentifierElementsInCommonWith(
				aggregation.group.identifierElements,
			);

		return (
			commonElements.length
			&&
			isSubgroupOfGroupAndAncestors(aggregation.group)
			&&
			aggregateWhenNotParent()
		);

		function isSubgroupOfGroupAndAncestors(
			group,
		) {
			return (
				commonElements.length < group.identifierElements.length
				&&
				(!group.parent || isSubgroupOfGroupAndAncestors(group.parent))
			);
		}

		function aggregateWhenNotParent() {
			const identifier = joinIdentifierSeparatorElements(commonElements);

			return (
				identifier !== parentIdentifier
				&&
				{
					group:
						{
							identifierElements: commonElements,
							item: { id: identifier },
							itemsOfGroup: [ getItemOrCreateItemForGroupAndParents(aggregation.group) ],
							...createLastItemOfGroupProperty(),
						},
					items:
						aggregation.items,
				}
			);
		}
	};