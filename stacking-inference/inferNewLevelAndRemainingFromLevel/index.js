// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import allDependsUponAndDescendantsWithDependsUponInDifferentLevel from "./allDependsUponAndDescendantsWithDependsUponInDifferentLevel";
import anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel from "./anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel";
import groupBy from "lodash/groupBy";

export default
// ignore lodash groupBy TypeScript return type
/** @returns {{newLevel, remaining}} */
level => {
	// @ts-ignore
	return (
		groupBy(
			level,
			getNewLevelOrRemaining,
		)
	);

	function getNewLevelOrRemaining(
		item,
	) {
		return (
			(canBeInNewLevel() && "newLevel")
			||
			"remaining"
		);

		function canBeInNewLevel() {
			return (
				allDependsUponAndDescendantsWithDependsUponInDifferentLevel({
					dependsUpon: item.dependsUpon,
					isDependencyOfDifferentItemInSameLevel,
					items: item.items,
				})
				&&
				anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel({
					dependents: item.dependents,
					isDependencyOfDifferentItemInSameLevel,
					items: item.items,
				})
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
	}
};