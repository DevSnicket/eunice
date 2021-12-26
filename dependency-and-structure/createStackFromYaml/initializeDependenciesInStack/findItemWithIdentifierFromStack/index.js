// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import findInDescendantsOfItems from "./findInDescendantsOfItems";

export default ({
	dependent,
	identifier,
	stack,
}) =>
	withIsItem(
		item =>
			item.id === identifier
			&&
			item !== dependent,
	)
	.findItemInStack(stack);

function withIsItem(
	isItem,
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
				isItem(parent)
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
		return items.find(isItem);
	}
}