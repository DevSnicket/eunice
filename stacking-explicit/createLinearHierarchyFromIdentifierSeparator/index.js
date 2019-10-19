// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const replaceIdentifiersAndItems = require("../replacement/replaceIdentifiersAndItems");

module.exports =
	({
		identifierSeparator,
		items,
	}) =>
		replaceIdentifiersAndItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				withIdentifierSeparator(identifierSeparator)
				.replaceIdentifierOrItem,
		});

function withIdentifierSeparator(
	identifierSeparator,
) {
	return { replaceIdentifierOrItem };

	function replaceIdentifierOrItem(
		{ identifierOrItem },
	) {
		return (
			whenIdentifier()
			||
			whenIdentifiableItem()
			||
			identifierOrItem
		);

		function whenIdentifier() {
			return (
				typeof identifierOrItem === "string"
				&&
				replaceIdentifier(identifierOrItem)
			);
		}

		function whenIdentifiableItem() {
			return (
				identifierOrItem.id
				&&
				replaceIdentifiableItem(identifierOrItem)
			);
		}
	}

	function replaceIdentifier(
		identifier,
	) {
		return (
			replaceWhenIdentifierHasSegments({
				createItemForIdentifierSegment:
					identifierSegment => identifierSegment,
				identifierSegments:
					identifier.split(identifierSeparator),
			})
			||
			identifier
		);
	}

	function replaceIdentifiableItem({
		id,
		...restOfItem
	}) {
		return (
			replaceWhenIdentifierHasSegments({
				createItemForIdentifierSegment:
					identifierSegment => (
						{
							id: identifierSegment,
							...restOfItem,
						}
					),
				identifierSegments:
					id.split(identifierSeparator),
			})
		);
	}
}

function replaceWhenIdentifierHasSegments({
	createItemForIdentifierSegment,
	identifierSegments,
}) {
	return (
		identifierSegments.length > 1
		&&
		identifierSegments
		.reduceRight(
			(item, identifierSegment) =>
				item
				?
				{
					id: identifierSegment,
					items: item,
				}
				:
				createItemForIdentifierSegment(identifierSegment),
			null,
		)
	);
}