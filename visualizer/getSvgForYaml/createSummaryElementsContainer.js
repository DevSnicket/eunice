module.exports =
	({
		arrows,
		createInlineDependencyElements,
		dependencyCounts,
		stackElementsContainer,
	}) => {
		return (
			dependencyCounts.length
			?
			create()
			:
			stackElementsContainer);

		function create() {
			const top = stackElementsContainer.bottom + 15;

			return (
				createContainer({
					elements:
						createInlineDependencyElements({
							center: stackElementsContainer.right / 2,
							count: sumCounts(dependencyCounts),
							top,
						}),
					height:
						arrows.right.height,
					stackElementsContainer,
					top,
				})
			);
		}
	};

function sumCounts(
	counts
) {
	return (
		counts.reduce(
			(aggregation, count) =>
				count.dependsUpon
				?
				sumDependsUpon({
					aggregation,
					dependsUpon: count.dependsUpon,
				})
				:
				aggregation,
			null
		)
	);
}

function sumDependsUpon({
	aggregation,
	dependsUpon,
}) {
	return (
		aggregation
		?
		sumCount(
			sumCount(aggregation, dependsUpon.inner),
			dependsUpon.outer
		)
		:
		sumCount(dependsUpon.inner, dependsUpon.outer)
	);
}

function sumCount(
	left,
	right
) {
	return (
		left && right
		?
		{
			above: left.above + right.above,
			below: left.below + right.below,
			same: left.same + right.same,
		}
		:
		left || right
	);
}

function createContainer({
	elements,
	height,
	stackElementsContainer,
	top,
}) {
	return (
		{
			bottom:
				top + height,
			elements:
				[
					...stackElementsContainer.elements,
					...elements,
				],
			right:
				stackElementsContainer.right,
		}
	);
}