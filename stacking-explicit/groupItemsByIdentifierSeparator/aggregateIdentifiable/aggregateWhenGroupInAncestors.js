/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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