// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	dependenciesFromItemSelector,
	isDependencyOfDifferentItemInSameLevel,
	item,
}) =>
	withContext({
		dependenciesFromItemSelector,
		isDependencyOfDifferentItemInSameLevel,
	})
	.anyInItem(
		item,
	);

function withContext({
	dependenciesFromItemSelector,
	isDependencyOfDifferentItemInSameLevel,
}) {
	return { anyInItem };

	function anyInItem(
		item,
	) {
		return (
			anyInDependencies(
				dependenciesFromItemSelector(
					item,
				),
			)
			||
			anyInStack(item.items)
		);
	}

	function anyInDependencies(
		dependencies,
	) {
		return (
			dependencies
			&&
			dependencies.some(isDependencyOfDifferentItemInSameLevel)
		);
	}

	function anyInStack(
		stack,
	) {
		return (
			stack
			&&
			stack.some(anyInLevel)
		);
	}

	function anyInLevel(
		level,
	) {
		return level.some(anyInItem);
	}
}