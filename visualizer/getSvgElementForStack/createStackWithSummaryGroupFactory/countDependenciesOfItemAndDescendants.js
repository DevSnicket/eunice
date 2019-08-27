// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	countDependenciesOfItem = require("../countDependenciesOfItem"),
	sumDependencyCount = require("../sumDependencyCount");

module.exports = countDependenciesOfItemAndDescendants;

function countDependenciesOfItemAndDescendants({
	item,
	parentStack,
}) {
	const itemCount =
		countDependenciesOfItem({
			item,
			parentStack,
			sumCount: sumDependencyCount,
		});

	return (
		item.items
		?
		countDependenciesOfItems()
		:
		itemCount
	);

	function countDependenciesOfItems() {
		return (
			sumCountsOfItems({
				counts:
					item.items.map(
						level =>
							sumCountsOfItems({
								counts:
									level.map(countDependenciesOfChildItemRecursive),
								initialValue:
									null,
							}),
					),
				initialValue:
					itemCount,
			})
		);
	}

	function countDependenciesOfChildItemRecursive(
		childItem,
	) {
		return (
			countDependenciesOfItemAndDescendants({
				item: childItem,
				parentStack,
			})
		);
	}

	function sumCountsOfItems({
		counts,
		initialValue,
	}) {
		return (
			counts.reduce(
				sumCountOfItem,
				initialValue,
			)
		);
	}

	function sumCountOfItem(
		left,
		right,
	) {
		if (left && right) {
			const
				dependents =
					sumDependencyCount(
						left.dependents,
						right.dependents,
					),
				dependsUpon =
					sumCountWithScope(
						left.dependsUpon,
						right.dependsUpon,
					);

			return (
				(dependents || dependsUpon)
				&&
				{ dependents, dependsUpon }
			);
		} else
			return left || right;
	}

	function sumCountWithScope(
		left,
		right,
	) {
		if (left && right) {
			const
				inner = sumDependencyCount(left.inner, right.inner),
				outer = sumDependencyCount(left.outer, right.outer);

			return (
				(inner || outer)
				&&
				{ inner, outer }
			);
		} else
			return left || right;
	}
}