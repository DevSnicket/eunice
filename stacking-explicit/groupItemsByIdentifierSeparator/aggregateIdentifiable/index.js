// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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