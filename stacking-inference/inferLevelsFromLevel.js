// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import groupBy from "lodash/groupBy";

export default inferLevelsFromLevel;

function inferLevelsFromLevel(
	level,
) {
	return (
		inferLevelsWhenHasLowerLevel({
			...getLowerAndUpperFromLevel(
				level,
			),
			stack:
				level.stack,
		})
		||
		[ level ]
	);
}

/** @returns {any} */
function getLowerAndUpperFromLevel(
	level,
) {
	return (
		groupBy(
			level,
			getIsItemLowerOrUpper,
		)
	);

	function getIsItemLowerOrUpper(
		item,
	) {
		return (
			canBeInLower()
			?
			"lower"
			:
			"upper"
		);

		function canBeInLower() {
			return (
				allDependsUponAndDescendantsWithDependsUponInDifferentLevel({
					dependsUpon: item.dependsUpon,
					items: item.items,
				})
				&&
				anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel({
					dependents: item.dependents,
					items: item.items,
				})
			);
		}

		function allDependsUponAndDescendantsWithDependsUponInDifferentLevel({
			dependsUpon,
			items,
		}) {
			return (
				allDependsUponInDifferentLevel(dependsUpon)
				&&
				allDescendantsWithDependsUponInDifferentLevel(items)
			);
		}

		function allDependsUponInDifferentLevel(
			dependsUpon,
		) {
			return (
				!dependsUpon
				||
				dependsUpon.every(
					({ itemOrFirstAncestorItem }) =>
						!itemOrFirstAncestorItem
						||
						!isDependencyOfDifferentItemInSameLevel(itemOrFirstAncestorItem),
				)
			);
		}

		function allDescendantsWithDependsUponInDifferentLevel(
			stackOfDescendant,
		) {
			return (
				!stackOfDescendant
				||
				stackOfDescendant.every(levelOfDescendant => levelOfDescendant.every(allDependsUponAndDescendantsWithDependsUponInDifferentLevel))
			);
		}

		function anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel({
			dependents,
			items,
		}) {
			return (
				anyDependentsOfDifferentItemInSameLevel(dependents)
				||
				anyDescendantsInStackWithDependentsOfDifferentItemInSameLevel(items)
			);
		}

		function anyDependentsOfDifferentItemInSameLevel(
			dependents,
		) {
			return (
				dependents
				&&
				dependents.some(isDependencyOfDifferentItemInSameLevel)
			);
		}

		function isDependencyOfDifferentItemInSameLevel(
			dependency,
		) {
			return (
				dependency !== item
				&&
				isOrHasAncestor()
			);

			function isOrHasAncestor() {
				return (
					dependency.level === level
					||
					hasAncestor()
				);
			}

			function hasAncestor() {
				return (
					dependency.level.stack.parent
					&&
					isDependencyOfDifferentItemInSameLevel(dependency.level.stack.parent)
				);
			}
		}

		function anyDescendantsInStackWithDependentsOfDifferentItemInSameLevel(
			stackOfDescendant,
		) {
			return (
				stackOfDescendant
				&&
				stackOfDescendant.some(levelOfDescendant => levelOfDescendant.some(anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel))
			);
		}
	}
}

function inferLevelsWhenHasLowerLevel({
	lower,
	stack,
	upper,
}) {
	return lower && inferInUpper();

	function inferInUpper() {
		upper.stack = stack;

		for (const item of upper)
			item.level = upper;

		return [
			...inferLevelsFromLevel(upper),
			lower,
		];
	}
}