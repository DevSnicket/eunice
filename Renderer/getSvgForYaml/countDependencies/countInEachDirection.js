module.exports =
	({
		dependencies,
		getStackDirection,
	}) =>
		dependencies
		&&
		dependencies.length
		&&
		dependencies
		.reduce(
			(count, dependency) =>
				dependency
				?
				countInDirection({
					count,
					direction: getStackDirection(dependency.parent),
				})
				:
				count,
			{ above: 0, below: 0, same: 0 }
		);

function countInDirection({
	count,
	direction,
}) {
	return (
		{
			above: count.above + (direction < 0),
			below: count.below + (direction > 0),
			same: count.same + (direction == 0),
		});
}