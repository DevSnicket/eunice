// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import formatAncestorIdentifiersOfStackForError from "./formatAncestorIdentifiersOfStackForError";

export default
(/** @type {import("./Parameter.d")} */{
	identifierHierarchy,
	stack,
}) =>
	identifierHierarchy.reduce(
		/** @param {import("./Parameter.d").Item} item */
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

/** @param {import("./Parameter.d").Item} item */
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
  * @param {import("./Parameter.d").Stack} parameter.stack
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