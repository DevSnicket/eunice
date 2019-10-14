/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatmap")
.shim();

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
			findInItems(items)
			||
			findWhenIsOrInParent(stack.parent)
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

	function findInItems(
		items,
	) {
		return items.find(item => item.id === identifier);
	}
}