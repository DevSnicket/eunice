/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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