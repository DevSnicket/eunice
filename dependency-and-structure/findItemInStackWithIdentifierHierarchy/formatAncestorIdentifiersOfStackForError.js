// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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

/** @param {Item} item */
function * getIdentifiersOfItemAndAncestors(
	item,
) {
	yield `"${item.id}"`;

	if (item.level.stack.parent)
		for (const ancestor of getIdentifiersOfItemAndAncestors(item.level.stack.parent))
			yield ancestor;
}

function joinIdentifiers(
	identifiers,
) {
	return (
		[ ...identifiers ]
		.reverse()
		.join("->")
	);
}