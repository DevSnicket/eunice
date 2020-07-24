// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { isInnerStack } from "@devsnicket/eunice-dependency-and-structure";

export default
({
	dependsUpon,
	dependents,
	parentStack,
}) => {
	return (
		{
			dependsUpon:
				countDirectionsOfDependencies({
					dependencies: dependsUpon,
					sumDirectionInStack: sumDirectionInStackWithScope,
				}),
			outerDependents:
				countDirectionsOfDependencies({
					dependencies: dependents,
					sumDirectionInStack: sumDirectionInStackWhenOuter,
				}),
		}
	);

	function sumDirectionInStackWhenOuter({
		aggregation,
		directionInStack,
	}) {
		return (
			hasSameOrOuterStack(directionInStack)
			?
			sumCountByDirection(
				aggregation,
				getCountOfOneFromDirection(directionInStack.direction),
			)
			:
			aggregation
		);
	}

	function sumDirectionInStackWithScope({
		aggregation,
		directionInStack,
	}) {
		const count = getCountOfOneFromDirection(directionInStack.direction);

		return (
			hasSameOrOuterStack(directionInStack)
			?
			sumDirectionInOuterStack()
			:
			sumDirectionInInnerStack()
		);

		function sumDirectionInOuterStack() {
			return (
				aggregation
				?
				{
					inner: aggregation.inner,
					outer: sumCountByDirection(aggregation.outer, count),
				}
				:
				{ outer: count }
			);
		}

		function sumDirectionInInnerStack() {
			return (
				aggregation
				?
				{
					inner: sumCountByDirection(aggregation.inner, count),
					outer: aggregation.outer,
				}
				:
				{ inner: count }
			);
		}
	}

	function hasSameOrOuterStack(
		{ stack },
	) {
		return (
			stack
			&&
			isSameOrOuterStack()
		);

		function isSameOrOuterStack() {
			return (
				!isInnerStack({
					source: parentStack,
					target: stack,
				})
			);
		}
	}
};

function countDirectionsOfDependencies({
	dependencies,
	sumDirectionInStack,
}) {
	return (
		dependencies
		&&
		dependencies
		.reduce(
			(aggregation, dependency) =>
				sumDependency({
					aggregation,
					dependency,
				}),
			null,
		)
	);

	function sumDependency({
		aggregation,
		dependency,
	}) {
		return whenHasTo() || aggregation;

		function whenHasTo() {
			return (
				dependency
				&&
				sumDirectionInStack({
					aggregation,
					directionInStack: dependency,
				})
			);
		}
	}
}

function getCountOfOneFromDirection(
	direction,
) {
	return {
		above: Number(direction === "above"),
		below: Number(direction === "below"),
		same: Number(direction === "same"),
	};
}

function sumCountByDirection(
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