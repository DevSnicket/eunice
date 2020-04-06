// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createYamlFromStack } from "@devsnicket/eunice-dependency-and-structure";
import groupBy from "lodash/groupBy";

export default ({
	createStackFromYaml,
	level,
}) =>
	withCreateStackFromYaml(
		createStackFromYaml,
	)
	.inferStackFromLevel(
		level,
	);

function withCreateStackFromYaml(
	createStackFromYaml,
) {
	return { inferStackFromLevel };

	function inferStackFromLevel(
		level,
	) {
		return (
			createStackFromLowerAndUpper(
				getLowerAndUpperFromLevel(
					createStackFromYaml(
						level,
					)[0],
				),
			)
		);
	}

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
				canBeLowerLevel()
				?
				"lower"
				:
				"upper"
			);

			function canBeLowerLevel() {
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

	function createStackFromLowerAndUpper({
		lower,
		upper,
	}) {
		return whenHasLower() || [ upper ];

		function whenHasLower() {
			return (
				lower
				&&
				[
					...inferStackFromLevel(
						createYamlFromStack(
							[ upper ],
						),
					),
					lower,
				]
			);
		}
	}
}