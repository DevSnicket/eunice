const findDirectionBetweenItemsInFirstMutualStack = require("./countDependenciesOfItemRecursive/findDirectionBetweenItemsInFirstMutualStack");

module.exports = countDependenciesOfItemRecursive;

function countDependenciesOfItemRecursive(
	item
) {
	const itemCount = countDependenciesOfItem();

	return (
		item.items
		?
		countDependenciesOfItems()
		:
		itemCount
	);

	function countDependenciesOfItem() {
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
	}

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

	function countDependenciesOfItems() {
		return (
			sumCountsOfItems({
				counts:
					item.items.map(
						level =>
							sumCountsOfItems({
								counts:
									level.map(countDependenciesOfItemRecursive),
								initialValue:
									null,
							})
					),
				initialValue:
					itemCount,
			})
		);
	}
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
	return stack && !stack.parent;
}

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

function sumCountsOfItems({
	counts,
	initialValue,
}) {
	return (
		counts.reduce(
			sumCountOfItem,
			initialValue
		)
	);
}

function sumCountOfItem(
	left,
	right
) {
	if (left && right) {
		const
			dependents =
				sumCount(
					left.dependents,
					right.dependents
				),
			dependsUpon =
				sumCountWithScope(
					left.dependsUpon,
					right.dependsUpon
				);

		return (
			(dependents || dependsUpon)
			&&
			{ dependents, dependsUpon }
		);
	} else
		return left || right;
}

function sumCountWithScope(
	left,
	right
) {
	const
		inner = sumCount(left.inner, right.inner),
		outer = sumCount(left.outer, right.outer);

	return (
		(inner || outer)
		&&
		{ inner, outer }
	);
}

function sumCount(
	left,
	right
) {
	return (
		left
		?
		{
			above: left.above + right.above,
			below: left.below + right.below,
			same: left.same + right.same,
		}
		:
		right
	);
}