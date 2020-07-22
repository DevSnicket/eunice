// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	replaceLowestLevelWithLevels,
	stack,
}) =>
	withReplaceLowestLevelWithLevels(
		replaceLowestLevelWithLevels,
	)
	.replaceInStackAndDescendantStacks(
		stack,
	);

function withReplaceLowestLevelWithLevels(
	replaceLowestLevelWithLevels,
) {
	return { replaceInStackAndDescendantStacks };

	function replaceInStackAndDescendantStacks(
		stack,
	) {
		return [
			...replaceDescendantsInStack(
				replaceStack(
					stack,
				),
			),
		];
	}

	function * replaceStack(
		stack,
	) {
		const lowestLevel = stack.pop();

		for (const level of stack)
			yield level;

		for (const level of replaceLowestLevelWithLevels(lowestLevel))
			yield level;
	}

	function * replaceDescendantsInStack(
		stack,
	) {
		for (const level of stack)
			yield [ ...replaceDescendantsInLevel(level) ];
	}

	function * replaceDescendantsInLevel(
		level,
	) {
		for (const item of level)
			yield {
				...item,
				items:
					item.items
					&&
					replaceInStackAndDescendantStacks(item.items),
			};
	}
}