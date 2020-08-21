// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import eitherOrCombine from "./eitherOrCombine";
import sumAncestorDirections from "./sumAncestorDirections";
import sumDescendantDirections from "./sumDescendantDirections";

export default
dependencyCounts => {
	let aggregation = null;

	for (const dependencyCount of dependencyCounts)
		aggregation =
			eitherOrCombine(
				aggregation,
				dependencyCount,
				sumDependencyCount,
			);

	return aggregation;
};

function sumDependencyCount(
	left,
	right,
) {
	return {
		...createProperty("ancestor", sumAncestorDirections),
		...createProperty("descendant", sumDescendantDirections),
		...createProperty("parent", sumAncestorDirections),
	};

	function createProperty(
		scope,
		sumScope,
	) {
		return (
			createPropertyWhenHasCount(
				eitherOrCombine(
					left[scope],
					right[scope],
					sumScope,
				),
			)
		);

		function createPropertyWhenHasCount(
			count,
		) {
			return count && { [scope]: count };
		}
	}
}