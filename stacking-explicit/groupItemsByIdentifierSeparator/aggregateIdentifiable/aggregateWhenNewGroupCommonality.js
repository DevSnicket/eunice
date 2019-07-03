/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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