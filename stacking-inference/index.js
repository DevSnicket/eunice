// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import inferNewLevelAndRemaining from "./inferNewLevelAndRemaining";

export default inferStacksInStack;

function inferStacksInStack(
	/** @type {import("@devsnicket/eunice-dependency-and-structure/Stack")} */
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
					anyInSameLevel: ({ dependents }) => dependents,
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
					allInDifferentLevel: ({ dependents }) => dependents,
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