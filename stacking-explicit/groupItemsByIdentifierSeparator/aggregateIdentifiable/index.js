/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	aggregateWhenGroupInAncestors = require("./aggregateWhenGroupInAncestors"),
	aggregateWhenNewGroupCommonality = require("./aggregateWhenNewGroupCommonality"),
	aggregateWhenSubgroupCommonality = require("./aggregateWhenSubgroupCommonality"),
	getItemsFromAggregation = require("../getItemsFromAggregation");

module.exports =
	({
		aggregation,
		identifierElements,
		itemWithItemsGrouped,
		joinIdentifierSeparatorElements,
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
				aggregateWhenSubgroupCommonality({
					aggregation,
					createLastItemOfGroupProperty,
					getIdentifierElementsInCommonWith,
					joinIdentifierSeparatorElements,
				})
				||
				aggregateWhenNewGroupCommonality({
					aggregation,
					createLastItemOfGroupProperty,
					getIdentifierElementsInCommonWith,
					joinIdentifierSeparatorElements,
					parentIdentifier,
				})
				||
				aggregateWhenInCurrentGroup()
				||
				aggregateWhenGroupInAncestors({
					aggregation,
					createGroupWithItemInGroup,
					createLastItemOfGroupProperty,
					getIdentifierElementsInCommonWith,
					identifierElementsStartsWith,
					joinIdentifierSeparatorElements,
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
					aggregation.group.lastItemOfGroup.identifierElements,
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
					aggregation.group.identifierElements,
				)
				&&
				{
					group: createGroupWithItemInGroup(aggregation.group),
					items: aggregation.items,
				}
			);
		}

		function getIdentifierElementsInCommonWith(
			otherIdentifierElements,
		) {
			let isCommon = true;

			return (
				otherIdentifierElements.filter(
					(otherIdentifierElement, index) =>
						isCommon =
							isCommon
							&&
							otherIdentifierElement === identifierElements[index],
				)
			);
		}

		function identifierElementsStartsWith(
			startsWithElements,
		) {
			return (
				startsWithElements.every(
					(identifierElement, index) =>
						identifierElement === identifierElements[index],
				)
			);
		}

		function createGroupWithItemInGroup(
			group,
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