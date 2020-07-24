// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import countDirectionsAndScopesOfDependencies from "./countDirectionsAndScopesOfDependencies";
import createDependencyCountProperty from "./createDependencyCountProperty";
import getDirectionAndStackOfDependenciesInStack from "./getDirectionAndStackOfDependenciesInStack";

export default replaceInStack;

function replaceInStack(
	stack,
) {
	return (
		stack.map(
			level =>
				level.map(replaceInItem),
		)
	);
}

function replaceInItem({
	directionAndStackOfDependencies,
	...item
}) {
	return {
		...item,
		...createDependencyCountProperty(
			countDirectionsAndScopesOfDependencies({
				...getDirectionAndStackOfDependenciesWithAncestors(),
				parentStack:
					item.level.stack,
			}),
		),
		...item.items && { items: replaceInStack(item.items) },
	};

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
				directionAndStackOfDependencies,
			)
		);
	}
}