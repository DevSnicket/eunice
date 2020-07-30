// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	findDirectionBetweenItemsInMutualStack,
	stack,
}) =>
	withFindDirectionBetweenItemsInMutualStack(
		findDirectionBetweenItemsInMutualStack,
	)
	.inStack(
		stack,
	);

function withFindDirectionBetweenItemsInMutualStack(
	findDirectionBetweenItemsInMutualStack,
) {
	return { inStack };

	function inStack(
		stack,
	) {
		for (const level of stack)
			for (const item of level) {
				inItem(item);

				if (item.items)
					inStack(item.items);
			}
	}

	function inItem(
		item,
	) {
		return (
			withFindDependencyDirectionInMutualStack(
				dependency =>
					findDirectionBetweenItemsInMutualStack({
						from: item,
						to: dependency,
					}),
			)
			.inDependencies(item)
		);
	}
}

function withFindDependencyDirectionInMutualStack(
	findDependencyDirectionInMutualStack,
) {
	return { inDependencies };

	function inDependencies({
		dependents,
		dependsUpon,
	}) {
		inDependents(dependents);
		inDependsUpon(dependsUpon);
	}

	function inDependents(
		dependents,
	) {
		if (dependents)
			for (const dependent of dependents)
				inDependent(dependent);
	}

	function inDependent(
		dependent,
	) {
		setDirectionAndMutualStackInDependency({
			dependency:
				dependent,
			...findDependencyDirectionInMutualStack(
				dependent.item,
			),
		});
	}

	function inDependsUpon(
		dependsUpon,
	) {
		if (dependsUpon)
			for (const dependUpon of dependsUpon)
				inDependUpon(dependUpon);
	}

	function inDependUpon(
		dependUpon,
	) {
		if (dependUpon.itemOrFirstAncestorItem)
			setDirectionAndMutualStackInDependency({
				dependency:
					dependUpon,
				...findDependencyDirectionInMutualStack(
					dependUpon.itemOrFirstAncestorItem,
				),
			});
	}
}

function setDirectionAndMutualStackInDependency({
	dependency,
	direction,
	mutualStack,
}) {
	dependency.direction = direction;
	dependency.mutualStack = mutualStack;
}