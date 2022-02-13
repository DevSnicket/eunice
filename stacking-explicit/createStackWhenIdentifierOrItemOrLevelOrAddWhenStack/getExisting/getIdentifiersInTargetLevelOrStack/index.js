/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

export default getIdentifiersInTargetLevelOrStack;

function getIdentifiersInTargetLevelOrStack(
	targetLevelOrStack,
) {
	return (
		targetLevelOrStack
		.flatMap(getIdentifierOrIdentifiersInItemOrLevel)
	);
}

function getIdentifierOrIdentifiersInItemOrLevel(
	identifierOrItemOrLevel,
) {
	return whenLevel() || asIdentifierOrItem();

	function whenLevel() {
		return (
			Array.isArray(identifierOrItemOrLevel)
			&&
			identifierOrItemOrLevel.flatMap(getIdentifierOrIdentifiersInItem)
		);
	}

	function asIdentifierOrItem() {
		return getIdentifierOrIdentifiersInItem(identifierOrItemOrLevel);
	}
}

function getIdentifierOrIdentifiersInItem(
	identifierOrItem,
) {
	return (
		whenIdentifier()
		||
		asItem()
		||
		[ null ]
	);

	function whenIdentifier() {
		return (
			typeof identifierOrItem === "string"
			&&
			[ identifierOrItem ]
		);
	}

	function asItem() {
		return getIdentifiersInItem(identifierOrItem);
	}
}

function getIdentifiersInItem(
	item,
) {
	return (
		item
		&&
		[
			item.id || null,
			...getWhenHasItems() || [],
		]
	);

	function getWhenHasItems() {
		return (
			item.items
			&&
			getIdentifiersInItems(item.items)
		);
	}
}

function getIdentifiersInItems(
	items,
) {
	return whenLevelOrStack() || asIdentifierOrItem();

	function whenLevelOrStack() {
		return (
			Array.isArray(items)
			&&
			getIdentifiersInTargetLevelOrStack(items)
		);
	}

	function asIdentifierOrItem() {
		return getIdentifierOrIdentifiersInItem(items);
	}
}