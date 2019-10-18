/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	({
		findItems,
		items,
	}) =>
		withFindItems(findItems)
		.findInDescendantsOfItems(items);

function withFindItems(
	findItems,
) {
	return { findInDescendantsOfItems };

	function findInDescendantsOfItems(
		items,
	) {
		return (
			findInChildren(
				getChildrenOfPermeableItems(
					items,
				),
			)
		);
	}

	function getChildrenOfPermeableItems(
		items,
	) {
		return (
			items
			.flatMap(
				item =>
					(item.dependencyPermeable && item.items)
					||
					[],
			)
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