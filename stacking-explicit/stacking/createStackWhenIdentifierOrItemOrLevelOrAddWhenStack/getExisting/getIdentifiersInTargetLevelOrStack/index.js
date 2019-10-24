// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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