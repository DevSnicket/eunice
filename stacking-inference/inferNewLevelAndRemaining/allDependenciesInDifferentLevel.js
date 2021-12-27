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
	.allInItem(
		item,
	);

function withContext({
	dependenciesFromItemSelector,
	isDependencyOfDifferentItemInSameLevel,
}) {
	return { allInItem };

	function allInItem(
		item,
	) {
		return (
			allInDependencies(
				dependenciesFromItemSelector(
					item,
				),
			)
			&&
			allInStack(item.items)
		);
	}

	function allInDependencies(
		dependencies,
	) {
		return (
			!dependencies
			||
			dependencies.every(
				dependency => !isDependencyOfDifferentItemInSameLevel(dependency),
			)
		);
	}

	function allInStack(
		stack,
	) {
		return (
			!stack
			||
			stack.every(allInLevel)
		);
	}

	function allInLevel(
		level,
	) {
		return level.every(allInItem);
	}
}