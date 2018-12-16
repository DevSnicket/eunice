module.exports =
	items =>
		items
		&&
		withParentIdentifier(
			null,
		)
		.getIdentifierOrSetInItemOrLevelOrStack(
			items,
		);

function withParentIdentifier(
	parentIdentifier,
) {
	return { getIdentifierOrSetInItemOrLevelOrStack };

	function getIdentifierOrSetInItemOrLevelOrStack(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			getWhenIdentifier()
			||
			setInWhenLevelOrStack()
			||
			setInItem(identifierOrItemOrLevelOrStack)
		);

		function getWhenIdentifier() {
			return (
				typeof identifierOrItemOrLevelOrStack === "string"
				&&
				identifierOrItemOrLevelOrStack
			);
		}

		function setInWhenLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				identifierOrItemOrLevelOrStack.map(setInItemOrLevel)
			);
		}
	}

	function setInItemOrLevel(
		itemOrLevel,
	) {
		return (
			setInWhenLevel(itemOrLevel)
			||
			getIdentifierOrSetInItem(itemOrLevel)
		);
	}

	function setInWhenLevel(
		itemOrLevel,
	) {
		return (
			Array.isArray(itemOrLevel)
			&&
			itemOrLevel.map(getIdentifierOrSetInItem)
		);
	}

	function getIdentifierOrSetInItem(
		identifierOrItem,
	) {
		return (
			getWhenIdentifier()
			||
			setInItem(identifierOrItem)
		);

		function getWhenIdentifier() {
			return (
				typeof identifierOrItem === "string"
				&&
				identifierOrItem
			);
		}
	}

	function setInItem({
		id: identifier = parentIdentifier,
		items,
		...restOrItem
	}) {
		return (
			{
				...identifier && { id: identifier },
				...restOrItem,
				...items && { items: getItems() },
			}
		);

		function getItems() {
			return (
				withParentIdentifier(
					identifier,
				)
				.getIdentifierOrSetInItemOrLevelOrStack(
					items,
				)
			);
		}
	}
}