// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const findInDescendantsOfItems = require("./findInDescendantsOfItems");

module.exports =
	({
		identifier,
		stack,
	}) =>
		withIdentifier(identifier)
		.findItemInStack(stack);

function withIdentifier(
	identifier,
) {
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