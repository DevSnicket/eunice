const getWithDirection = require("./getWithDirection");

module.exports =
	({
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