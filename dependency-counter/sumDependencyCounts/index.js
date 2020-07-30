// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import eitherOrCombine from "./eitherOrCombine";
import sumInnerDirections from "./sumInnerDirections";
import sumOuterDirections from "./sumOuterDirections";

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
		...createProperty("inner", sumInnerDirections),
		...createProperty("outer", sumOuterDirections),
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