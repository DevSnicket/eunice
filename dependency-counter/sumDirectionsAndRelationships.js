// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import combineDirections from "./combineDirections";
import eitherOrCombine from "./eitherOrCombine";

/**
  * @param {import("./Counts.d").ByDirectionAndRelationship} left
  * @param {import("./Counts.d").ByDirectionAndRelationship} right
  * @return {import("./Counts.d").ByDirectionAndRelationship}
  */
export default (
	left,
	right,
) =>
	eitherOrCombine(
		left,
		right,
		() =>
			combineDirections(
				left,
				right,
				sumRelationships,
			),
	);

function sumRelationships(
	left,
	right,
) {
	return {
		...createPropertyForRelationship("dependents"),
		...createPropertyForRelationship("dependsUpon"),
	};

	function createPropertyForRelationship(
		relationship,
	) {
		return (
			createPropertyWhenHasCount(
				eitherOrCombine(
					left[relationship],
					right[relationship],
					sumRelationship,
				),
			)
		);

		function createPropertyWhenHasCount(
			count,
		) {
			return count && { [relationship]: count };
		}
	}
}

function sumRelationship(
	left,
	right,
) {
	return left + right;
}