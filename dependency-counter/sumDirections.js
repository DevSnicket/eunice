// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import combineDirections from "./combineDirections";
import eitherOrCombine from "./eitherOrCombine";

/**
  * @param {import("./Counts.d").ByDirection} left
  * @param {import("./Counts.d").ByDirection} right
  * @return {import("./Counts.d").ByDirection}
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
				sumDescendantDirection,
			),
	);

function sumDescendantDirection(
	left,
	right,
) {
	return left + right;
}