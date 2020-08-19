// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getDependsUponOfOuter from "./getDependsUponOfOuter";

export default
stack =>
	getDependencyCountWhenHasMultiple(
		stack
		.flat(2)
		.reduce(
			(
				{ dependencyCount, hasMultiple },
				item,
			) => {
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
							hasMultiple
							||
							(dependencyCount && dependencyCountOfItem),
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
			Object.assign({}, ...createProperties())
		);

		function createProperties() {
			return (
				[ "above", "below", "same" ]
				.map(createPropertyForLevelDirection)
			);

			function createPropertyForLevelDirection(
				levelDirection,
			) {
				return { [levelDirection]: sum() };

				function sum() {
					return (
						(left[levelDirection] || 0)
						+
						(right[levelDirection] || 0)
					);
				}
			}
		}
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