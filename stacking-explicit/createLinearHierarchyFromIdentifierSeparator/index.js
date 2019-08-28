// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const replaceItemsAndInItems = require("../replaceItemsAndInItems");

module.exports =
	({
		identifierSeparator,
		items,
	}) =>
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				withIdentifierSeparator(identifierSeparator)
				.replaceIdentifierOrItemOrLevelOrStack,
		});

function withIdentifierSeparator(
	identifierSeparator,
) {
	return (
		{
			replaceIdentifierOrItemOrLevelOrStack:
				({ identifierOrItemOrLevelOrStack }) =>
					identifierOrItemOrLevelOrStack
					&&
					replaceIdentifierOrItemOrLevelOrStack(identifierOrItemOrLevelOrStack),
		}
	);

	function replaceIdentifierOrItemOrLevelOrStack(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			whenLevelOrStack()
			||
			replaceIdentifierOrItem(identifierOrItemOrLevelOrStack)
		);

		function whenLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				identifierOrItemOrLevelOrStack.map(replaceIdentifierOrItemOrLevel)
			);
		}
	}

	function replaceIdentifierOrItemOrLevel(
		identifierOrItemOrLevel,
	) {
		return (
			whenLevel()
			||
			replaceIdentifierOrItem(identifierOrItemOrLevel)
		);

		function whenLevel() {
			return (
				Array.isArray(identifierOrItemOrLevel)
				&&
				identifierOrItemOrLevel.map(replaceIdentifierOrItem)
			);
		}
	}

	function replaceIdentifierOrItem(
		identifierOrItem,
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