// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { replaceItemsAndInItems } = require("@devsnicket/eunice-processors");

module.exports =
	items =>
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace,
		});

function replace({
	ancestors,
	identifierOrItemOrLevelOrStack,
}) {
	return (
		identifierOrItemOrLevelOrStack
		&&
		withAncestors(ancestors)
		.replaceIdentifierOrItemOrLevelOrStack(identifierOrItemOrLevelOrStack)
	);
}

function withAncestors(
	ancestors,
) {
	return { replaceIdentifierOrItemOrLevelOrStack };

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
		return whenAnonymousExport() || identifierOrItem;

		function whenAnonymousExport() {
			return (
				identifierOrItem.type === "export"
				&&
				{
					id: getParentIdentifier(),
					...identifierOrItem,
				}
			);
		}
	}

	function getParentIdentifier() {
		return (
			ancestors.length
			&&
			ancestors[ancestors.length - 1].id
		);
	}
}