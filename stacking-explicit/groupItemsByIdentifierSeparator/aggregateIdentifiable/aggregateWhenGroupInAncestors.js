// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const getItemOrCreateItemForGroup = require("../getItemOrCreateItemForGroup");

module.exports =
	({
		aggregation,
		createGroupWithItemInGroup,
		createLastItemOfGroupProperty,
		getIdentifierElementsInCommonWith,
		identifierElementsStartsWith,
		joinIdentifierSeparatorElements,
	}) => {
		return aggregateWhenGroupInAncestors(aggregation.group);

		function aggregateWhenGroupInAncestors(
			group,
		) {
			return (
				group.parent
				&&
				(
					aggregateSubgroupOfParentWhenCommonality()
					||
					aggregateWhenInGroupParent()
					||
					aggregateWhenGroupInAncestors({
						...group.parent,
						lastItemOfGroup:
							{
								identifierElements: group.identifierElements,
								item: getItemOrCreateItemForGroup(group),
							},
					})
				)
			);

			function aggregateSubgroupOfParentWhenCommonality() {
				const commonElements = getIdentifierElementsInCommonWith(group.identifierElements);

				return (
					commonElements.length > group.parent.identifierElements.length
					&&
					{
						group:
							{
								identifierElements:
									commonElements,
								item:
									{ id: joinIdentifierSeparatorElements(commonElements) },
								itemsOfGroup:
									[ getItemOrCreateItemForGroup(group) ],
								...createLastItemOfGroupProperty(),
								parent:
									group.parent,
							},
						items:
							aggregation.items,
					}
				);
			}

			function aggregateWhenInGroupParent(
			) {
				return (
					identifierElementsStartsWith(
						group.parent.identifierElements,
					)
					&&
					{
						group:
							createGroupWithItemInGroup({
								...group.parent,
								lastItemOfGroup:
									{
										identifierElements:
											group.identifierElements,
										item:
											getItemOrCreateItemForGroup(group),
									},
							}),
						items:
							aggregation.items,
					}
				);
			}
		}
	};