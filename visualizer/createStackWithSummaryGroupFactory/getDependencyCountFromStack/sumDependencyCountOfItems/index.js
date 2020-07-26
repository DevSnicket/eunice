// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getDependsUponOfOuter from "./getDependsUponOfOuter";

export default
items =>
	getDependencyCountWhenHasMultiple(
		items
		.reduce(
			({ dependencyCount }, item) => {
				const dependencyCountOfItem =
					sumDependencyCountOfItem(item);

				return (
					{
						dependencyCount:
							sumDependencyCount(
								dependencyCount,
								dependencyCountOfItem,
							),
						hasMultiple:
							dependencyCount
							&&
							dependencyCountOfItem,
					}
				);
			},
			{},
		),
	);

function sumDependencyCountOfItem(
	{ dependencyCount },
) {
	return (
		dependencyCount
		&&
		sumDependencyCountOfInnerAndOuter(dependencyCount)
	);
}

function sumDependencyCountOfInnerAndOuter({
	inner,
	outer,
}) {
	return (
		sumDependencyCount(
			inner,
			outer && getDependsUponOfOuter(outer),
		)
	);
}

function sumDependencyCount(
	left,
	right,
) {
	return (
		whenHasBoth()
		||
		left
		||
		right
	);

	function whenHasBoth() {
		return (
			left
			&&
			right
			&&
			{
				above: left.above + right.above,
				below: left.below + right.below,
				same: left.same + right.same,
			}
		);
	}
}

function getDependencyCountWhenHasMultiple({
	dependencyCount,
	hasMultiple,
}) {
	return (
		hasMultiple
		&&
		dependencyCount
	);
}