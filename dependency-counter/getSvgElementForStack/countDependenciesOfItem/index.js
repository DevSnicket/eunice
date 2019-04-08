const
	findDirectionBetweenItemsInFirstMutualStack = require("./findDirectionBetweenItemsInFirstMutualStack"),
	{ isInnerStack } = require("@devsnicket/eunice-dependency-and-structure");

module.exports =
	({
		item,
		parentStack,
		sumCount,
	}) => {
		return (
			createWhenDependentsOrDependsUpon({
				dependents:
					countDependencies({
						dependencies: item.dependents,
						from: item,
						sumDirectionInStack: sumDirectionInStackWhenOuter,
					}),
				dependsUpon:
					countDependencies({
						dependencies: item.dependsUpon,
						from: item,
						itemSelector: dependsUpon => dependsUpon.item,
						sumDirectionInStack: sumDirectionInStackWithScope,
					}),
			})
		);

		function sumDirectionInStackWhenOuter({
			aggregation,
			directionInStack,
		}) {
			return (
				hasSameOrOuterStack(directionInStack)
				?
				sumCount(
					aggregation,
					getCountFromDirection(directionInStack.direction),
				)
				:
				aggregation
			);
		}

		function sumDirectionInStackWithScope({
			aggregation,
			directionInStack,
		}) {
			const count = getCountFromDirection(directionInStack.direction);

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
						outer: sumCount(aggregation.outer, count),
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
						inner: sumCount(aggregation.inner, count),
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

function countDependencies({
	dependencies,
	from,
	itemSelector = item => item,
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
					to: itemSelector(dependency),
				}),
			null,
		)
	);

	function sumDependency({
		aggregation,
		to,
	}) {
		return (
			typeof to === "string"
			?
			aggregation
			:
			sumDirectionInStack({
				aggregation,
				directionInStack:
					findDirectionBetweenItemsInFirstMutualStack({
						from,
						to,
					}),
			})
		);
	}
}

function getCountFromDirection(
	direction,
) {
	return (
		{
			above: Number(direction < 0),
			below: Number(direction > 0),
			same: Number(direction === 0),
		}
	);
}

function createWhenDependentsOrDependsUpon({
	dependents,
	dependsUpon,
}) {
	return (
		(dependents || dependsUpon)
		&&
		{ dependents, dependsUpon }
	);
}