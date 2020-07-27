// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import inferLowerAndUpperFromLevel from "./inferLowerAndUpperFromLevel";

export default inferStacksInStack;

function inferStacksInStack(
	/** @type {import("@devsnicket/eunice-dependency-and-structure/Stack")} */
	stack,
) {
	for (const level of stack)
		for (const item of level)
			if (item.items)
				inferStacksInStack(item.items);

	inStack(stack)
	.inferLevelsAndReplaceLowestLevel();
}

function inStack(
	stack,
) {
	return { inferLevelsAndReplaceLowestLevel };

	function inferLevelsAndReplaceLowestLevel() {
		const newLevels =
			inferLevelsFromLevel(
				stack[stack.length - 1],
			);

		if (newLevels) {
			stack.pop();
			stack.push(...newLevels);
		}
	}

	function inferLevelsFromLevel(
		level,
	) {
		return (
			initializeLevelsAndInferLevelsInUpper(
				inferLowerAndUpperFromLevel(
					level,
				),
			)
		);
	}

	function initializeLevelsAndInferLevelsInUpper({
		lower,
		upper,
	}) {
		return lower && whenHasLower();

		function whenHasLower() {
			initializeLevel(lower);
			initializeLevel(upper);

			return [
				...inferLevelsFromLevel(upper) || [ upper ],
				lower,
			];
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