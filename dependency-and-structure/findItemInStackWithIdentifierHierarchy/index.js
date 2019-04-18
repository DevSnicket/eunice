/**
 * @typedef Stack
 * @property {Item} [parent]
 * @property {function(StackReduceSelector,Item):Item} reduce
 *
 * @callback StackReduceSelector
 * @param {Item} item
 * @param {Level} level
 * @returns {Item}
 *
 * @typedef Item
 * @property {String} [id]
 * @property {Stack} [items]
 * @property {Level} level
 *
 * @typedef Level
 * @property {function(LevelFindPredicate):Item} find
 * @property {Stack} stack
 *
 * @callback LevelFindPredicate
 * @param {Item} item
 * @returns {Boolean}
 */
const formatAncestorIdentifiersOfStackForError = require("./formatAncestorIdentifiersOfStackForError");

module.exports =
	/**
	 * @param {Object} parameter
	 * @param {String[]} parameter.identifierHierarchy
	 * @param {Stack} parameter.stack
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
 */
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