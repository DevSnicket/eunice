// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

module.exports =
	({
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
				replaceInWhenHasValue(
					replaceIdentifierOrItemOrLevelOrStack({
						ancestors,
						identifierOrItemOrLevelOrStack,
					}),
				)
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
					Array.isArray(levelOrStack[0])
					&&
					replaceInStack(levelOrStack)
				);
			}
		}

		function replaceInStack(
			stack,
		) {
			return stack.map(replaceInLevel);
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
				{
					...item,
					...getItemsProperty(),
				}
			);

			function getItemsProperty() {
				const items = getItems();

				return (
					items
					&&
					{ items }
				);
			}

			function getItems() {
				return (
					withAncestors(
						[ ...ancestors, item ],
					)
					.replaceAndReplaceIn(
						item.items,
					)
				);
			}
		}
	}
}