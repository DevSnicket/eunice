// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import sumDirections from "./sumDirections";

export default (
	left,
	right,
) =>
	sumDirections(
		left,
		right,
		sumInnerDirection,
	);

function sumInnerDirection(
	left,
	right,
) {
	return left + right;
}