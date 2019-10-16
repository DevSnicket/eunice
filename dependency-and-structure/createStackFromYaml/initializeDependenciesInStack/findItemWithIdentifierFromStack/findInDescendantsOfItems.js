/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	({
		findItems,
		itemPredicate,
		items,
	}) =>
		itemPredicate
		&&
		withFindItemsAndPredicate({
			findItems,
			itemPredicate,
		})
		.findInDescendantsOfItems(
			items,
		);

function withFindItemsAndPredicate({
	findItems,
	itemPredicate,
}) {
	return { findInDescendantsOfItems };

	function findInDescendantsOfItems(
		items,
	) {
		return (
			findInChildren(
				getChildrenOfItems(
					items.filter(itemPredicate),
				),
			)
		);
	}

	function getChildrenOfItems(
		items,
	) {
		return (
			items
			.flatMap(item => item.items || [])
			.flat(3)
		);
	}

	function findInChildren(
		children,
	) {
		return (
			children.length
			&&
			(findItems(children) || findInDescendantsOfItems(children))
		);
	}
}