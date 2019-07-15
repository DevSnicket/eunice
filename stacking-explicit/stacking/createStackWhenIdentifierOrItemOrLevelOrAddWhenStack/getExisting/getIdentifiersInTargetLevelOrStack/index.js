/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports = getIdentifiersInTargetLevelOrStack;

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
	return whenIdentifier() || asItem();

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
		[
			...getFromIdentifier(),
			...getWhenHasItems() || [],
		]
	);

	function * getFromIdentifier() {
		if (item.id)
			yield item.id;
	}

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