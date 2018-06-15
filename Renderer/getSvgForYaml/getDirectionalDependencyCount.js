module.exports =
	({
		arrows,
		dependentsCount,
		dependsUponCount,
	}) => {
		return (
			whenHasValues({
				above:
					getWithDirection({
						countSelector: dependencies => dependencies.above,
						down: dependentsCount,
						up: dependsUponCount,
					}),
				below:
					getWithDirection({
						countSelector: dependencies => dependencies.below,
						down: dependsUponCount,
						up: dependentsCount,
					}),
				same:
					getForSame(),
			}));

		function getForSame() {
			return (
				(dependentsCount || dependsUponCount)
				&&
				{
					arrow: arrows.right,
					dependents: dependentsCount ? dependentsCount.same : 0,
					dependsUpon: dependsUponCount ? dependsUponCount.same : 0,
				});
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
				}));
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

function whenHasValues(
	count
) {
	return (count.above || count.below || count.same) && count;
}