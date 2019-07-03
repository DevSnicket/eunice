/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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