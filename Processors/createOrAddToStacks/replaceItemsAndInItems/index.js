module.exports =
	({
		identifierOrItemOrLevelOrStack,
		replace,
	}) =>
		withReplace(
			replace,
		)
		.withAncestors(
			[],
		)
		.replaceAndReplaceIn(
			identifierOrItemOrLevelOrStack,
		);

function withReplace(
	replace,
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
					replace({
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
				getIdentifierOrReplaceInItemOrLevelorStack(identifierOrItemOrLevelOrStack)
			);
		}

		function getIdentifierOrReplaceInItemOrLevelorStack(
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