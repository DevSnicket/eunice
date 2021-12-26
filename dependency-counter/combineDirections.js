// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import eitherOrCombine from "./eitherOrCombine";

export default (
	left,
	right,
	combineDirection,
) => {
	return {
		...createPropertyForDirection("above"),
		...createPropertyForDirection("below"),
		...createPropertyForDirection("same"),
	};

	function createPropertyForDirection(
		direction,
	) {
		return (
			createPropertyWhenHasCount(
				eitherOrCombine(
					left[direction],
					right[direction],
					combineDirection,
				),
			)
		);

		function createPropertyWhenHasCount(
			count,
		) {
			return count && { [direction]: count };
		}
	}
};