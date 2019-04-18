/**
 * @typedef Stack
 * @property {Item} [parent]
 *
 * @typedef Item
 * @property {String} [id]
 * @property {Level} level
 *
 * @typedef Level
 * @property {Stack} stack
 */

module.exports =
	/** @param {Stack} stack */
	stack =>
		ofItemWhenHasValue(stack.parent)
		||
		"";

/** @param {Item} item */
function ofItemWhenHasValue(
	item,
) {
	return (
		item
		&&
		` in hierarchy ${formatHierarchy()}`
	);

	function formatHierarchy() {
		return (
			joinIdentifiers(
				getIdentifiersOfItemAndAncestors(
					item,
				),
			)
		);
	}
}

/**
 * @param {Item} item
 * @returns {IterableIterator<String>}
 */
function * getIdentifiersOfItemAndAncestors(
	item,
) {
	yield `"${item.id}"`;

	if (item.level.stack.parent)
		for (const ancestor of getIdentifiersOfItemAndAncestors(item.level.stack.parent))
			yield ancestor;
}


/** @param {IterableIterator<String>} identifiers */
function joinIdentifiers(
	identifiers,
) {
	return (
		[ ...identifiers ]
		.reverse()
		.join("->")
	);
}