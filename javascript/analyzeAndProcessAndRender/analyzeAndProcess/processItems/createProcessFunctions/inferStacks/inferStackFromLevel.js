// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure"),
	{ groupBy } = require("lodash");

module.exports = inferStackFromLevel;

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
				hasNoDependsUponInSameLevel(item.dependsUpon)
				&&
				hasDependentsInSameLevel({
					dependents: item.dependents,
					items: item.items,
				})
			);
		}

		function hasNoDependsUponInSameLevel(
			dependsUpon,
		) {
			return (
				!dependsUpon
				||
				dependsUpon.every(
					({ itemOrFirstAncestorItem }) =>
						!itemOrFirstAncestorItem
						||
						!isDependencyInSameLevel(itemOrFirstAncestorItem),
				)
			);
		}

		function hasDependentsInSameLevel({
			dependents,
			items,
		}) {
			return (
				anyDependentsInSameLevel(dependents)
				||
				anyDescendantsWithDependentsInSameLevel(items)
			);
		}

		function anyDependentsInSameLevel(
			dependents,
		) {
			return (
				dependents
				&&
				dependents.some(isDependencyInSameLevel)
			);
		}

		function isDependencyInSameLevel(
			dependency,
		) {
			return (
				dependency !== item
				&&
				isOrHasAncestorInSameLevel()
			);

			function isOrHasAncestorInSameLevel() {
				return (
					dependency.level === level
					||
					isAncestorInSameLevel()
				);
			}

			function isAncestorInSameLevel() {
				return (
					dependency.level.stack.parent
					&&
					isDependencyInSameLevel(dependency.level.stack.parent)
				);
			}
		}

		function anyDescendantsWithDependentsInSameLevel(
			items,
		) {
			return (
				items
				&&
				items.some(levelOfDescendant => levelOfDescendant.some(hasDependentsInSameLevel))
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