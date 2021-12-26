// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
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