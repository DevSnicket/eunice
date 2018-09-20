module.exports =
	(
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