/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import inferNewLevelAndRemaining from "./inferNewLevelAndRemaining";

export default inferStacksInStack;

function inferStacksInStack(
	/** @type {import("../dependency-and-structure/Stack")} */
	stack,
) {
	for (const level of stack)
		for (const item of level)
			if (item.items)
				inferStacksInStack(item.items);

	inferFromBottom();
	inferFromTop();

	function inferFromBottom() {
		withDirection({
			dependenciesFromItemSelectors:
				{
					allInDifferentLevel: getDependsUponItemsFromItem,
					anyInSameLevel: getDependentItemsFromItem,
				},
			getLevelsFromNewLevelAndRemaining:
				({ newLevel, remaining }) =>
					[ ...remaining, newLevel ],
		})
		.inferLevels({
			fromIndex: stack.length - 1,
			spliceStart: -1,
		});
	}

	function inferFromTop() {
		withDirection({
			dependenciesFromItemSelectors:
				{
					allInDifferentLevel: getDependentItemsFromItem,
					anyInSameLevel: getDependsUponItemsFromItem,
				},
			getLevelsFromNewLevelAndRemaining:
				({ newLevel, remaining }) =>
					[ newLevel, ...remaining ],
		})
		.inferLevels({
			fromIndex: 0,
			spliceStart: 0,
		});
	}

	function withDirection({
		dependenciesFromItemSelectors,
		getLevelsFromNewLevelAndRemaining,
	}) {
		return { inferLevels };

		function inferLevels({
			fromIndex,
			spliceStart,
		}) {
			const newLevels =
				inferLevelsFromLevel(
					stack[fromIndex],
				);

			if (newLevels)
				stack.splice(spliceStart, 1, ...newLevels);
		}

		function inferLevelsFromLevel(
			level,
		) {
			return (
				initializeLevelsAndInferLevelsInRemaining(
					inferNewLevelAndRemaining({
						dependenciesFromItemSelectors,
						level,
					}),
				)
			);
		}

		function initializeLevelsAndInferLevelsInRemaining({
			newLevel,
			remaining,
		}) {
			return newLevel && fromNewLevelsAndRemaining();

			function fromNewLevelsAndRemaining() {
				initializeLevel(newLevel);
				initializeLevel(remaining);

				return (
					getLevelsFromNewLevelAndRemaining({
						newLevel,
						remaining:
							inferLevelsFromLevel(remaining)
							||
							[ remaining ],
					})
				);
			}
		}
	}

	function initializeLevel(
		level,
	) {
		// @ts-ignore
		level.stack = stack;

		for (const item of level)
			item.level = level;
	}
}

function getDependentItemsFromItem(
	{ dependents },
) {
	return (
		dependents
		&&
		dependents.map(({ item }) => item)
	);
}

function getDependsUponItemsFromItem(
	{ dependsUpon },
) {
	return (
		dependsUpon
		&&
		dependsUpon.flatMap(
			({ itemOrFirstAncestorItem }) => itemOrFirstAncestorItem || [],
		)
	);
}