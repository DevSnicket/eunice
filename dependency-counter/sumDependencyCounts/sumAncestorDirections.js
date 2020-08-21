// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import eitherOrCombine from "./eitherOrCombine";
import sumDirections from "./sumDirections";

export default (
	left,
	right,
) =>
	sumDirections(
		left,
		right,
		sumAncestorDirection,
	);

function sumAncestorDirection(
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