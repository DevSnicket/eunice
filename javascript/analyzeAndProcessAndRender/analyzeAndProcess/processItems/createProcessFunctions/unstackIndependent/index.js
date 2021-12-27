// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createStackFromYaml, createYamlFromStack } from "@devsnicket/eunice-dependency-and-structure";

export default
identifierOrItemOrLevelOrStack =>
	createYamlFromStack(
		unstackIndependentInStack(
			createStackFromYaml(
				identifierOrItemOrLevelOrStack,
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
				anyInCurrentLevel({
					itemSelector: dependent => dependent.item,
					items: item.dependents,
				})
			);
		}

		function fromDependsUpon() {
			return (
				anyInCurrentLevel({
					itemSelector: dependUpon => dependUpon.itemOrFirstAncestorItem,
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
		itemSelector,
		items,
	}) {
		return (
			items
			&&
			items.some(item => hasLevelOfCurrent(itemSelector(item)))
		);
	}

	function hasLevelOfCurrent(
		item,
	) {
		return item && isOrIsInCurrentLevel(item.level);
	}

	function isOrIsInCurrentLevel(
		level,
	) {
		return (
			level
			&&
			(level === currentLevel || isInCurrentLevel())
		);

		function isInCurrentLevel() {
			return (
				level.stack.parent
				&&
				isOrIsInCurrentLevel(level.stack.parent.level)
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