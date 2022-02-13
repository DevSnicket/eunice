/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { createStackFromYaml, createYamlFromStack } from "../../../../../../dependency-and-structure";

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