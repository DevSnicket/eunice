// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import allDependenciesInDifferentLevel from "./allDependenciesInDifferentLevel";
import anyDependenciesInSameLevel from "./anyDependenciesInSameLevel";
import groupBy from "lodash/groupBy";

export default
// ignore lodash groupBy TypeScript return type
/** @returns {{newLevel, remaining}} */
({
	dependenciesFromItemSelectors,
	level,
}) => {
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
				allDependenciesInDifferentLevel({
					dependenciesFromItemSelector:
						dependenciesFromItemSelectors.allInDifferentLevel,
					isDependencyOfDifferentItemInSameLevel,
					item,
				})
				&&
				anyDependenciesInSameLevel({
					dependenciesFromItemSelector:
						dependenciesFromItemSelectors.anyInSameLevel,
					isDependencyOfDifferentItemInSameLevel,
					item,
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