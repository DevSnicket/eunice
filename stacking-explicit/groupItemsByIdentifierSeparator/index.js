/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	aggregateIdentifiable = require("./aggregateIdentifiable"),
	getItemsFromAggregation = require("./getItemsFromAggregation");

module.exports =
	({
		identifierSeparator,
		items,
	}) =>
		createGroupItemsForIdentifierSeparator(identifierSeparator)(items);

function createGroupItemsForIdentifierSeparator(
	identifierSeparator,
) {
	return itemOrItems => getItemOrGroupItemsInParentIdentifier({ itemOrItems, parentIdentifier: null });

	function getItemOrGroupItemsInParentIdentifier({
		itemOrItems,
		parentIdentifier,
	}) {
		return (
			Array.isArray(itemOrItems)
			?
			groupItems()
			:
			itemOrItems
		);

		function groupItems() {
			return (
				getItemsFromAggregation(
					itemOrItems
					.reduce(
						(aggregation, item) =>
							aggregate({
								aggregation,
								getItemOrGroupItemsInParentIdentifier,
								identifierSeparator,
								item,
								parentIdentifier,
							}),
						null,
					),
				)
			);
		}
	}
}

function aggregate({
	aggregation,
	getItemOrGroupItemsInParentIdentifier,
	identifierSeparator,
	item,
	parentIdentifier,
}) {
	const identifier = getIdentifierWhenSpecified();

	return (
		identifier
		?
		throwErrorOnUnordered(
			aggregateIdentifiable({
				aggregation,
				identifierElements: identifier.split(identifierSeparator),
				itemWithItemsGrouped: createItemWithItemsGrouped(),
				joinIdentifierSeparatorElements,
				parentIdentifier,
			}),
		)
		:
		{
			group:
				{
					identifierElements: [],
					item,
				},
			items:
				getItemsFromAggregation(aggregation),
		}
	);

	function getIdentifierWhenSpecified() {
		return (
			typeof item === "string"
			?
			item
			:
			item.id
		);
	}

	function joinIdentifierSeparatorElements(
		identifierElements,
	) {
		return identifierElements.join(identifierSeparator);
	}

	function createItemWithItemsGrouped() {
		return (
			typeof item === "string" || typeof item.items === "string"
			?
			item
			:
			{
				...item,
				...createItemsPropertyWhenAny(),
			}
		);

		function createItemsPropertyWhenAny() {
			return (
				item.items
				&&
				{
					items:
						getItemOrGroupItemsInParentIdentifier({
							itemOrItems: item.items,
							parentIdentifier: item.id,
						}),
				});
		}
	}

	function throwErrorOnUnordered(
		newAggregation,
	) {
		if (aggregation && identifier < aggregation.previousIdentifier)
			throw Error(`Item identifiers must be in order, "${identifier}" can not follow "${aggregation.previousIdentifier}".`);
		else
			return (
				{
					...newAggregation,
					previousIdentifier: identifier,
				}
			);
	}
}