// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import countDirectionsAndScopesOfDependencies from "./countDirectionsAndScopesOfDependencies";
import createDependencyCount from "./createDependencyCount";
import getDirectionAndStackOfDependenciesInStack from "./getDirectionAndStackOfDependenciesInStack";

export default replaceInStack;

function replaceInStack(
	stack,
) {
	for (const level of stack)
		for (const item of level)
			replaceInItem(item);
}

function replaceInItem(
	item,
) {
	addDependencyCount();

	if (item.items)
		replaceInStack(item.items);

	function addDependencyCount() {
		const dependencyCount =
			createDependencyCount(
				countDirectionsAndScopesOfDependencies({
					...getDirectionAndStackOfDependenciesWithAncestors(),
					parentStack:
						item.level.stack,
				}),
			);

		delete item.directionAndStackOfDependencies;

		if (dependencyCount)
			item.dependencyCount = dependencyCount;
	}

	function getDirectionAndStackOfDependenciesWithAncestors() {
		return (
			getDirectionAndStackOfDependenciesInStack(item.items)
			.reduce(
				(
					aggregation,
					{ dependents, dependsUpon },
				) => ({
					dependents:
						[
							...aggregation.dependents || [],
							...dependents || [],
						],
					dependsUpon:
						[
							...aggregation.dependsUpon || [],
							...dependsUpon || [],
						],
				}),
				item.directionAndStackOfDependencies,
			)
		);
	}
}