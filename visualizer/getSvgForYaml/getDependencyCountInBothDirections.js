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
							countSelector:
								dependencies => dependencies.above,
							down:
								dependencyCount.dependents,
							up:
								dependencyCount.dependsUpon
								&&
								dependencyCount.dependsUpon.outer,
						}),
					below:
						getWithDirection({
							countSelector:
								dependencies => dependencies.below,
							down:
								dependencyCount.dependsUpon
								&&
								dependencyCount.dependsUpon.outer,
							up:
								dependencyCount.dependents,
						}),
					same:
						getForSame(),
				}
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

		function getWithDirection({
			countSelector,
			down,
			up,
		}) {
			return (
				getFromDirectionCount({
					down: down && countSelector(down),
					up: up && countSelector(up),
				})
			);
		}

		function getFromDirectionCount({
			down,
			up,
		}) {
			return (
				(down || up)
				&&
				[
					down && { arrow: arrows.down, count: down },
					up && { arrow: arrows.up, count: up },
				]
				.filter(dependencies => dependencies));
		}
	};

function whenCountHasValues(
	count
) {
	return (count.above || count.below || count.same || count.inner) && count;
}