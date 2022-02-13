/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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
					(item && getItemsOfOrThrowError(item))
					||
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