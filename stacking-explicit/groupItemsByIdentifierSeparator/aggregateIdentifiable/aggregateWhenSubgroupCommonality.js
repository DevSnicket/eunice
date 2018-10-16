module.exports =
	({
		aggregation,
		createLastItemOfGroupProperty,
		getIdentifierElementsInCommonWith,
		joinIdentifierSeparatorElements,
	}) => {
		return (
			aggregation.group.lastItemOfGroup
			&&
			aggregateWhenSubgroupCommonality()
		);

		function aggregateWhenSubgroupCommonality() {
			const commonElements =
				getIdentifierElementsInCommonWith(
					aggregation.group.lastItemOfGroup.identifierElements,
				);

			return (
				isSubgroup()
				&&
				aggregateSubgroup()
			);

			function isSubgroup() {
				return commonElements.length > aggregation.group.identifierElements.length;
			}

			function aggregateSubgroup() {
				return (
					{
						group:
							{
								identifierElements:
									commonElements,
								item:
									{ id: joinIdentifierSeparatorElements(commonElements) },
								itemsOfGroup:
									[ aggregation.group.lastItemOfGroup.item ],
								...createLastItemOfGroupProperty(),
								parent:
									aggregation.group,
							},
						items:
							aggregation.items,
					}
				);
			}
		}
	};