/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
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