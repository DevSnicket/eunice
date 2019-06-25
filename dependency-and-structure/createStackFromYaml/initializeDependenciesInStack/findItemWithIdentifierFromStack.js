/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatmap")
.shim();

module.exports = findItemWithIdentifierFromStack;

function findItemWithIdentifierFromStack({
	identifier,
	stack,
}) {
	const items = stack.flat(2);

	return (
		findItemWithIdentifier({
			identifier,
			items,
		})
		||
		findWhenIsOrInParent({
			identifier,
			parent: stack.parent,
		})
		||
		findInDescendants({
			identifier,
			items,
		})
	);
}

function findWhenIsOrInParent({
	identifier,
	parent,
}) {
	return (
		parent
		&&
		(getWhenParent() || findInParent())
	);

	function getWhenParent() {
		return (
			parent.id === identifier
			&&
			parent
		);
	}

	function findInParent() {
		return (
			findItemWithIdentifierFromStack({
				identifier,
				stack: parent.level.stack,
			})
		);
	}
}

function findInDescendants({
	identifier,
	items,
}) {
	const itemsOfItems =
		items
		.flatMap(item => item.items || [])
		.flat(3);

	return (
		itemsOfItems.length
		&&
		(inItemsOfItems() || inDescendantsOfItems())
	);

	function inItemsOfItems() {
		return (
			findItemWithIdentifier({
				identifier,
				items: itemsOfItems,
			})
		);
	}

	function inDescendantsOfItems() {
		return (
			findInDescendants({
				identifier,
				items: itemsOfItems,
			})
		);
	}
}

function findItemWithIdentifier({
	identifier,
	items,
}) {
	return items.find(item => item.id === identifier);
}