// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	arrows,
	createInlineDependencyGroups,
	dependencyCounts,
	stackGroupFactory,
}) => {
	const count = sumCounts(dependencyCounts);

	return (
		count
		&&
		count.above + count.below + count.same > 1
		?
		create()
		:
		stackGroupFactory
	);

	function create() {
		const topOffset = stackGroupFactory.height + 15;

		return (
			{
				createAtPosition,
				height:
					topOffset + arrows.right.height,
				width:
					stackGroupFactory.width,
			}
		);

		function createAtPosition({
			left,
			top,
		}) {
			return (
				[
					...stackGroupFactory.createAtPosition({
						left,
						top,
					}),
					...createInlineDependencyGroups({
						center: left + (stackGroupFactory.width / 2),
						count,
						top: top + topOffset,
					}),
				]
			);
		}
	}
};

function sumCounts(
	counts,
) {
	return (
		counts.length > 1
		&&
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
			null,
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
			dependsUpon.outer,
		)
		:
		sumCount(dependsUpon.inner, dependsUpon.outer)
	);
}

function sumCount(
	left,
	right,
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