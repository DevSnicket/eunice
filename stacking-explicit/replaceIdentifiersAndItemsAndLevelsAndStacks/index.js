// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

export default ({
	identifierOrItemOrLevelOrStack,
	replace,
}) =>
	withReplaceIdentifierOrItemOrLevelOrStack(
		replace,
	)
	.withAncestors(
		[],
	)
	.replaceAndReplaceIn(
		identifierOrItemOrLevelOrStack,
	);

function withReplaceIdentifierOrItemOrLevelOrStack(
	replaceIdentifierOrItemOrLevelOrStack,
) {
	return { withAncestors };

	function withAncestors(
		ancestors,
	) {
		return { replaceAndReplaceIn };

		function replaceAndReplaceIn(
			identifierOrItemOrLevelOrStack,
		) {
			return (
				replaceIdentifierOrItemOrLevelOrStack({
					ancestors,
					identifierOrItemOrLevelOrStack:
						replaceInWhenHasValue(
							identifierOrItemOrLevelOrStack,
						),
				})
			);
		}

		function replaceInWhenHasValue(
			identifierOrItemOrLevelOrStack,
		) {
			return (
				identifierOrItemOrLevelOrStack
				&&
				getIdentifierOrReplaceInItemOrLevelOrStack(identifierOrItemOrLevelOrStack)
			);
		}

		function getIdentifierOrReplaceInItemOrLevelOrStack(
			identifierOrItemOrLevelOrStack,
		) {
			return (
				whenLevelOrStack()
				||
				getWhenIdentifierOrReplaceInItem(identifierOrItemOrLevelOrStack)
			);

			function whenLevelOrStack() {
				return (
					Array.isArray(identifierOrItemOrLevelOrStack)
					&&
					replaceInLevelOrStack(identifierOrItemOrLevelOrStack)
				);
			}
		}

		function replaceInLevelOrStack(
			levelOrStack,
		) {
			return whenStack() || replaceInLevel(levelOrStack);

			function whenStack() {
				return (
					levelOrStack.some(Array.isArray)
					&&
					replaceInStack(levelOrStack)
				);
			}
		}

		function replaceInStack(
			stack,
		) {
			return stack.map(getWhenIdentifierOrReplaceInItemOrLevel);
		}

		function getWhenIdentifierOrReplaceInItemOrLevel(
			level,
		) {
			return (
				whenLevel()
				||
				getWhenIdentifierOrReplaceInItem(level)
			);

			function whenLevel() {
				return (
					Array.isArray(level)
					&&
					replaceInLevel(level)
				);
			}
		}

		function replaceInLevel(
			level,
		) {
			return level.map(getWhenIdentifierOrReplaceInItem);
		}

		function getWhenIdentifierOrReplaceInItem(
			identifierOrItem,
		) {
			return (
				whenIdentifier()
				||
				replaceInItem(identifierOrItem)
			);

			function whenIdentifier() {
				return (
					typeof identifierOrItem === "string"
					&&
					identifierOrItem
				);
			}
		}

		function replaceInItem(
			item,
		) {
			return (
				replaceItemsOfItem({
					item,
					items:
						withAncestors(
							[ ...ancestors, item ],
						)
						.replaceAndReplaceIn(
							item.items,
						),
				})
			);
		}
	}
}

function replaceItemsOfItem({
	item: {
		// remove old items property
		// eslint-disable-next-line no-unused-vars
		items: oldItems,
		...restOfItem
	},
	items,
}) {
	return (
		{
			...restOfItem,
			...items && { items },
		}
	);
}