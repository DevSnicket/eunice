// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";

export default ({
	ancestors,
	isItem,
}) => {
	const lastAncestor = ancestors[0];

	return (
		lastAncestor.items
		&&
		withIsItem(
			isItem,
		)
		.findInItemsAndPermeableDescendants(
			lastAncestor.items.flat(),
		)
	);
};

function withIsItem(
	isItem,
) {
	return { findInItemsAndPermeableDescendants };

	function findInItemsAndPermeableDescendants(
		items,
	) {
		return (
			findInItems()
			||
			findInItemsOfPermeable(
				getItemsOfItemsWhenDependencyPermeable(),
			)
		);

		function findInItems() {
			return items.find(isItem);
		}

		function getItemsOfItemsWhenDependencyPermeable() {
			return (
				items.flatMap(
					item =>
						getItemsOfItemWhenDependencyPermeable(item)
						||
						[],
				)
			);
		}
	}

	function getItemsOfItemWhenDependencyPermeable({
		dependencyPermeable,
		items,
	}) {
		return (
			dependencyPermeable
			&&
			items.flat()
		);
	}

	function findInItemsOfPermeable(
		items,
	) {
		return (
			items.length
			&&
			findInItemsAndPermeableDescendants(items)
		);
	}
}