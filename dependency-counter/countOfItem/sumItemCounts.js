// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import eitherOrCombine from "../eitherOrCombine";
import sumDirections from "../sumDirections";
import sumDirectionsAndRelationships from "../sumDirectionsAndRelationships";

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
		...createProperty("ancestors", sumDirectionsAndRelationships),
		...createProperty("descendants", sumDirections),
		...createProperty("parent", sumDirectionsAndRelationships),
	};

	function createProperty(
		scope,
		sumScope,
	) {
		return (
			createPropertyWhenHasCount(
				sumScope(
					left[scope],
					right[scope],
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