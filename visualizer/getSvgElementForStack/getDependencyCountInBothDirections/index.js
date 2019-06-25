/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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