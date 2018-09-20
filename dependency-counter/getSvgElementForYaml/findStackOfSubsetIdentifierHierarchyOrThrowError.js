module.exports =
	({
		stack,
		subsetIdentifierHierarchy,
	}) => {
		return (
			subsetIdentifierHierarchy.reduce(
				(
					stackInHierarchy,
					identifier,
				) =>
					getItemsOfOrThrowError(
						findItemWithIdentifierOrThrowError({
							identifier,
							stack: stackInHierarchy,
						}),
					),
				stack,
			)
		);

		function getItemsOfOrThrowError(
			item,
		) {
			if (item.items)
				return item.items;
			else
				throw Error(`Final item of subset identifier hierarchy "${subsetIdentifierHierarchy}" has no child items.`);
		}
	};

function findItemWithIdentifierOrThrowError({
	identifier,
	stack,
}) {
	const itemWithIdentifier =
		stack.reduce(
			(
				foundItem,
				level,
			) =>
				foundItem
				||
				level.find(
					item =>
						item.id === identifier,
				),
			null,
		);

	if (itemWithIdentifier)
		return itemWithIdentifier;
	else
		throw Error(`Identifier of "${identifier}" in subset hierarchy not found.`);
}