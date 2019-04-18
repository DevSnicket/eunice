/**
 * @typedef {import("./formatAncestorIdentifiersOfStackForError").Stack} StackForError
 *
 * @typedef {Level[] & StackForError} Stack
 *
 * @typedef Item
 * @property {String} [id]
 * @property {Stack} [items]
 * @property {Level} level
 *
 * @typedef HasStack
 * @property {Stack} stack
 *
 * @typedef {Item[] & HasStack} Level
 */
const formatAncestorIdentifiersOfStackForError = require("./formatAncestorIdentifiersOfStackForError");

module.exports =
	/**
	 * @param {Object} parameter
	 * @param {String[]} parameter.identifierHierarchy
	 * @param {Stack} parameter.stack
	 * @returns {Item}
	 */
	({
		identifierHierarchy,
		stack,
	}) =>
		identifierHierarchy.reduce(
			/** @param {Item} item */
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

/** @param {Item} item */
function getItemsOfOrThrowError(
	item,
) {
	if (item.items)
		return item.items;
	else
		throw new Error(`Item with identifier "${item.id}" found${formatAncestorIdentifiersOfStackForError(item.level.stack)} has no child items.`);
}

/**
 * @param {Object} parameter
 * @param {String} parameter.identifier
 * @param {Stack} parameter.stack
 * @returns {Item}
 */
function findItemWithIdentifierOrThrowError({
	identifier,
	stack,
}) {
	const itemWithIdentifier =
		stack.reduce(
			/** @param {Item} foundItem */
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