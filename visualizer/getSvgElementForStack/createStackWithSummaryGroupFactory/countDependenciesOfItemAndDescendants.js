/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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