const findDirectionBetweenItemsInFirstMutualStack = require("./countDependenciesOfItem/findDirectionBetweenItemsInFirstMutualStack");

module.exports =
	({
		item,
		parentStack,
		sumCount,
	}) => {
		const
			dependents =
				countDependencies({
					dependencies: item.dependents,
					sumDirectionInStack: sumDirectionInStackWhenOuter,
				}),
			dependsUpon =
				countDependencies({
					dependencies: item.dependsUpon,
					sumDirectionInStack: sumDirectionInStackWithScope,
				});

		return (
			(dependents || dependsUpon)
			&&
			{ dependents, dependsUpon }
		);

		function countDependencies({
			sumDirectionInStack,
			dependencies,
		}) {
			return (
				dependencies
				&&
				dependencies
				.reduce(
					(aggregation, dependency) =>
						typeof dependency === "string"
						?
						aggregation
						:
						sumDirectionInStack({
							aggregation,
							directionInStack:
								findDirectionBetweenItemsInFirstMutualStack({
									from: item,
									to: dependency,
								}),
						}),
					null
				)
			);
		}

		function sumDirectionInStackWhenOuter({
			aggregation,
			directionInStack,
		}) {
			return (
				isOuterStack(directionInStack.stack)
				?
				sumCount(
					aggregation,
					getCountFromDirection(directionInStack.direction)
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
				isOuterStack(directionInStack.stack)
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

		function isOuterStack(
			stack
		) {
			return (
				stack
				&&
				(stack === parentStack || !isInnerStack(stack))
			);
		}

		function isInnerStack(
			stack
		) {
			return (
				stack.parent
				&&
				(
					stack.parent.level.stack === parentStack
					||
					isInnerStack(stack.parent.level.stack)
				)
			);
		}
	};

function getCountFromDirection(
	direction
) {
	return (
		{
			above: Number(direction < 0),
			below: Number(direction > 0),
			same: Number(direction === 0),
		}
	);
}