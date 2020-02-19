// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default (
	left,
	right,
) =>
	left && right
	?
	{
		above: left.above + right.above,
		below: left.below + right.below,
		same: left.same + right.same,
	}
	:
	left || right;