module.exports = countDependenciesOfItemAndDescendants;

function countDependenciesOfItemAndDescendants({
	countDependenciesOfItem,
	item,
	parentStack,
	sumCount,
}) {
	const itemCount =
		countDependenciesOfItem({
			item,
			parentStack,
			sumCount,
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
		childitem,
	) {
		return (
			countDependenciesOfItemAndDescendants({
				countDependenciesOfItem,
				item: childitem,
				parentStack,
				sumCount,
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
					sumCount(
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
				inner = sumCount(left.inner, right.inner),
				outer = sumCount(left.outer, right.outer);

			return (
				(inner || outer)
				&&
				{ inner, outer }
			);
		} else
			return left || right;
	}
}