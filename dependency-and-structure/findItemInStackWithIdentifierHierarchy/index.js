const formatAncestorIdentifiersOfStackForError = require("./formatAncestorIdentifiersOfStackForError");

module.exports =
	/**
	 * @param {Object} parameter
	 * @param {String[]} parameter.identifierHierarchy
	 * @param {import("../index").Stack} parameter.stack
	 * @returns {import("../index").Item}
	 */
	({
		identifierHierarchy,
		stack,
	}) =>
		identifierHierarchy.reduce(
			(
				item,
				identifier,
			) =>
				findItemWithIdentifierOrThrowError({
					identifier,
					stack:
						item
						?
						getItemsOfOrThrowError(item)
						:
						stack,
				}),
			null,
		);

function getItemsOfOrThrowError(
	item,
) {
	if (item.items)
		return item.items;
	else
		throw new Error(`Item with identifier "${item.id}" found${formatAncestorIdentifiersOfStackForError(item.level.stack)} has no child items.`);
}

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
		throw new Error(`Identifier of "${identifier}" not found${formatAncestorIdentifiersOfStackForError(stack)}.`);
}