module.exports =
	({
		identifierOrItemOrLevelOrStack,
		replaceItem,
	}) =>
		withReplaceItem(
			replaceItem,
		)
		.getIdentifierOrReplaceItemOrItemsInLevelOrStack(
			identifierOrItemOrLevelOrStack,
		);

function withReplaceItem(
	replaceItem,
) {
	return { getIdentifierOrReplaceItemOrItemsInLevelOrStack };

	function getIdentifierOrReplaceItemOrItemsInLevelOrStack(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			whenLevelOrStack()
			||
			getIdentifierOrReplaceInItem(identifierOrItemOrLevelOrStack)
		);

		function whenLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				identifierOrItemOrLevelOrStack.map(getIdentifierOrReplaceInItemOrLevel)
			);
		}
	}

	function getIdentifierOrReplaceInItemOrLevel(
		levelOrItemOrIdentifier,
	) {
		return (
			whenLevel()
			||
			getIdentifierOrReplaceInItem(levelOrItemOrIdentifier)
		);

		function whenLevel() {
			return (
				Array.isArray(levelOrItemOrIdentifier)
				&&
				levelOrItemOrIdentifier.map(getIdentifierOrReplaceInItem)
			);
		}
	}

	function getIdentifierOrReplaceInItem(
		itemOrIdentifier,
	) {
		return (
			whenIdentifier()
			||
			replaceItem(itemOrIdentifier)
		);

		function whenIdentifier() {
			return (
				typeof itemOrIdentifier === "string"
				&&
				itemOrIdentifier
			);
		}
	}
}