// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const { createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure");

module.exports =
	items =>
		createYamlFromStack(
			unstackIndependentInStack(
				createStackFromYaml(
					items,
				),
			),
		);

function unstackIndependentInStack(
	stack,
) {
	return (
		getStackFromAggregation(
			stack.reduce(
				aggregate,
				{ stack: [] },
			),
		)
	);
}

function aggregate(
	{ lastLevel, stack },
	currentLevel,
) {
	unstackIndependentItemsInLevel();

	return (
		!lastLevel || anyDependenciesWithCurrentLevel(lastLevel)
		?
		addCurrentAsNewLevel()
		:
		combineCurrentWithLast()
	);

	function unstackIndependentItemsInLevel() {
		for (const item of currentLevel)
			if (item.items)
				item.items = unstackIndependentInStack(item.items);
	}

	function anyDependenciesWithCurrentLevel(
		level,
	) {
		return level.some(isItemDependentOnCurrentLevel);
	}

	function isItemDependentOnCurrentLevel(
		item,
	) {
		return (
			fromDependents()
			||
			fromDependsUpon()
			||
			fromItems()
		);

		function fromDependents() {
			return (
				anyInCurrentLevel(
					{ items: item.dependents },
				)
			);
		}

		function fromDependsUpon() {
			return (
				anyInCurrentLevel({
					itemSelector: dependUpon => dependUpon.item,
					items: item.dependsUpon,
				})
			);
		}

		function fromItems() {
			return (
				item.items
				&&
				item.items.some(anyDependenciesWithCurrentLevel)
			);
		}
	}

	function anyInCurrentLevel({
		itemSelector = item => item,
		items,
	}) {
		return (
			items
			&&
			items.some(item => hasLevelOfOrInCurrentLevel(itemSelector(item).level))
		);
	}

	function hasLevelOfOrInCurrentLevel(
		level,
	) {
		return level && isOrIsInCurrentLevel();

		function isOrIsInCurrentLevel() {
			return (
				level === currentLevel
				||
				(level.stack.parent && hasLevelOfOrInCurrentLevel(level.stack.parent.level))
			);
		}
	}

	function addCurrentAsNewLevel() {
		return (
			{
				lastLevel:
					currentLevel,
				stack:
					lastLevel
					?
					[
						...stack,
						lastLevel,
					]
					:
					stack,
			}
		);
	}

	function combineCurrentWithLast() {
		return (
			{
				lastLevel:
					[
						...lastLevel,
						...currentLevel,
					],
				stack,
			}
		);
	}
}

function getStackFromAggregation({
	lastLevel,
	stack,
}) {
	return (
		[
			...stack,
			lastLevel,
		]
	);
}