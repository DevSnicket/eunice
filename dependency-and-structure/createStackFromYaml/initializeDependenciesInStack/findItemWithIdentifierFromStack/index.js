/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatmap")
.shim();

const findInDescendantsOfItems = require("./findInDescendantsOfItems");

module.exports =
	({
		inDescendantsOfItemPredicate,
		identifier,
		stack,
	}) =>
		withCriteria({
			identifier,
			inDescendantsOfItemPredicate,
		})
		.findItemInStack(stack);

function withCriteria({
	identifier,
	inDescendantsOfItemPredicate,
}) {
	return { findItemInStack };

	function findItemInStack(
		stack,
	) {
		const items = stack.flat(2);

		return (
			findItems(items)
			||
			findWhenIsOrInParent(stack.parent)
			||
			findInDescendantsOfItems({
				findItems,
				itemPredicate: inDescendantsOfItemPredicate,
				items,
			})
		);
	}

	function findWhenIsOrInParent(
		parent,
	) {
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
			return findItemInStack(parent.level.stack);
		}
	}

	function findItems(
		items,
	) {
		return items.find(item => item.id === identifier);
	}
}