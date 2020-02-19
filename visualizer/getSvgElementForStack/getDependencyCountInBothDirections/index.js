// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getWithDirection from "./getWithDirection";

export default ({
	arrows,
	dependencyCount,
}) => {
	return (
		dependencyCount
		&&
		whenCountHasValues(
			{
				above:
					getWithDirection({
						arrows,
						countSelector:
							dependencies => dependencies.above,
						down:
							{
								dependencies:
									dependencyCount.dependents,
								relationship:
									"dependents",
							},
						level:
							"above",
						up:
							{
								dependencies:
									dependencyCount.dependsUpon
									&&
									dependencyCount.dependsUpon.outer,
								relationship:
									"dependsUpon",
							},
					}),
				below:
					getWithDirection({
						arrows,
						countSelector:
							dependencies => dependencies.below,
						down:
							{
								dependencies:
									dependencyCount.dependsUpon
									&&
									dependencyCount.dependsUpon.outer,
								relationship:
									"dependsUpon",
							},
						level:
							"below",
						up:
							{
								dependencies:
									dependencyCount.dependents,
								relationship:
									"dependents",
							},
					}),
				same:
					getForSame(),
			},
		)
	);

	function getForSame() {
		const
			dependents =
				dependencyCount.dependents
				&&
				dependencyCount.dependents.same,
			dependsUpon =
				dependencyCount.dependsUpon
				&&
				dependencyCount.dependsUpon.outer
				&&
				dependencyCount.dependsUpon.outer.same;

		return (
			(dependents || dependsUpon)
			&&
			{
				arrow: arrows.right,
				dependents,
				dependsUpon,
			}
		);
	}
};

function whenCountHasValues(
	count,
) {
	return (
		(count.above || count.below || count.same)
		&&
		count
	);
}